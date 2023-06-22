import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CharacterDto } from "../models/dtos/character.dto";
import { environment } from "src/environments/environment";
import { Character } from "../models/business/character.model";

@Injectable({ providedIn: 'root' })
export class CharacterAdapter {

    constructor(
        private http: HttpClient
    ) { }

    public getCharacter(characterId: string): Observable<Character> {
        return this.http.get<Character>(`${environment.eveApi.basePath}/characters/${characterId}`)
    }
}