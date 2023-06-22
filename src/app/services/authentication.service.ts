import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, lastValueFrom, map, of, shareReplay, switchMap, tap, timer } from "rxjs";
import { AuthenticationAdapter } from "../crest-client/adapters/authentication.adapter";
import { AccessToken, JwtToken } from "../crest-client/models/access_token.model";
import { ssoConfig } from "../configuration/sso.config";
import { environment } from 'src/environments/environment';
import { VerifyAccessTokenDto } from "../crest-client/models/dtos/verify_access_token.dto";
import jwt_decode from 'jwt-decode';

const REFRESH_AUTO = false;
const REFRESH_INTERVAL = 10000;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private _jwtToken = new BehaviorSubject<JwtToken | null>(null)
    public jwtToken = this._jwtToken.asObservable();

    public get jwtTokenValue(): JwtToken | null {
        return this._jwtToken.value;
    }

    constructor(private authenticationAdapter: AuthenticationAdapter) { }

    ssoConfig: ssoConfig = environment.eveApi.sso;
    ssoLogin() {
        this.authenticationAdapter.ssoLogin(
            this.ssoConfig.client_id,
            this.ssoConfig.base_uri,
            this.ssoConfig.authorize.callback_uri,
            this.ssoConfig.authorize.scopes, Math.random().toString());
    }

    private _accessToken!: Observable<AccessToken>
    authenticateSso(code: string): Observable<JwtToken> {
        if (!this._accessToken) {
            let request = this.requestAuthToken(code).pipe(shareReplay());

            if (REFRESH_AUTO) {
                const clock = timer(0, REFRESH_INTERVAL);
                this._accessToken = clock.pipe(switchMap(_ => request))
            } else {
                this._accessToken = request
            }
        }

        return this._accessToken.pipe(map(token => {
            let jwtToken = jwt_decode(token.access_token) as JwtToken
            this._jwtToken.next(jwtToken);
            return jwtToken;
        }));
    }

    requestAuthToken(code: string): Observable<AccessToken> {
        return this.authenticationAdapter.getAuthToken(
            this.ssoConfig.base_uri,
            this.ssoConfig.client_id,
            code);
    }

    verifyAccessToken(token: AccessToken) {

    }
}