import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { CharacterService } from './services/character.service';
import { Character } from './crest-client/models/business/character.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Next Frontier Peace Keeper';

  character: Character | null = null;

  constructor(
    private authenticationService: AuthenticationService,
    private characterService: CharacterService,
  ) {
    this.characterService.character.subscribe(character => this.onCharacterChange(character))
  }

  onLoginClick() {
    this.authenticationService.ssoLogin();
  }

  onCharacterChange(character: Character | null) {
    this.character = character
  }
}
