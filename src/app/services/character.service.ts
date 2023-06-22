import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, lastValueFrom, map, of, shareReplay, switchMap, tap, timer } from "rxjs";
import { AuthenticationAdapter } from "../crest-client/adapters/authentication.adapter";
import { AccessToken, JwtToken } from "../crest-client/models/access_token.model";
import { ssoConfig } from "../configuration/sso.config";
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { AuthenticationService } from "./authentication.service";
import { Character } from "../crest-client/models/business/character.model";
import { CharacterAdapter } from "../crest-client/adapters/character.adapter";
import { mapper } from "../crest-client/helpers/mapper.helper";
import { CharacterDto } from "../crest-client/models/dtos/character.dto";

const REFRESH_AUTO = false;
const REFRESH_INTERVAL = 10000;

@Injectable({ providedIn: 'root' })
export class CharacterService {
    private _character = new BehaviorSubject<Character | null>(null)
    public character = this._character.asObservable();

    constructor(
        private characterAdapter: CharacterAdapter,
        private authenticationService: AuthenticationService
    ) {
        authenticationService.jwtToken.subscribe(token => this.onJwtTokenChange(token))
    }

    private async onJwtTokenChange(token: JwtToken | null) {
        if (!token) {
            return;
        }
        let characterId = token.sub.split(':')[2]
        let character = await lastValueFrom(this.getCharacter(characterId));

        this._character.next(character);
    }

    private _charchaterCache: Map<string, Observable<Character>> = new Map<string, Observable<Character>>();
    getCharacter(characterId: string): Observable<Character> {
        if (!this._charchaterCache.has(characterId)) {
            let request = this.requestCharacter(characterId).pipe(shareReplay());

            if (REFRESH_AUTO) {
                const clock = timer(0, REFRESH_INTERVAL);
                this._charchaterCache.set(characterId, clock.pipe(switchMap(_ => request)))
            } else {
                this._charchaterCache.set(characterId, request)
            }
        }

        return this._charchaterCache.get(characterId)!;
    }

    requestCharacter(characterId: string): Observable<Character> {
        return this.characterAdapter.getCharacter(characterId)
    }
}