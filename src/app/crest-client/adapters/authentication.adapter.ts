import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Base64 } from "js-base64";
import { AccessToken } from "../models/access_token.model";
import { VerifyAccessTokenDto } from "../models/dtos/verify_access_token.dto";

@Injectable({ providedIn: 'root' })
export class AuthenticationAdapter {

    constructor(private http: HttpClient) {
    }

    ssoLogin(clientId: string, baseUri: string, callbackUri: string, scopes: string[], state: string) {
        let scope = scopes.reduce((x, y) => `${x} ${y}`)
        let url = encodeURI(`${baseUri}/authorize?response_type=code&redirect_uri=${callbackUri}&client_id=${clientId}&scope=${scope}&state=${state}`);

        window.location.href = url
    }

    public getAuthToken(baseUri: string, clientId: string, code: string): Observable<AccessToken> {
        let hash = Base64.encode(`${clientId}:wlmGikXE6t9YfUTsGDAQ0GOOa6QPLuJ4n18Adlxn`)
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${hash}`,
                'X-Host-Override': 'login.eveonline.com'
            })
        };
        const body = new HttpParams()
            .set('grant_type', "authorization_code")
            .set('code', code);
        return this.http.post<AccessToken>(`${baseUri}/token`, body.toString(), httpOptions);
    }
}