import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Character } from '../crest-client/models/business/character.model';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  character: Character | null = null;
  appVersion: string = environment.version;

  constructor(authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
  }

}
