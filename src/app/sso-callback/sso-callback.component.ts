import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'sso-callback',
  templateUrl: './sso-callback.component.html',
  styleUrls: ['./sso-callback.component.scss']
})
export class SsoCallbackComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.proceedWithAuthentication()
  }

  ngOnInit(): void {
  }

  async proceedWithAuthentication() {

    let params = this.activatedRoute.snapshot.queryParamMap;

    let code = params.get('code')!
    let state = params.get('state')!

    let _ = await lastValueFrom(this.authenticationService.authenticateSso(code));

    this.router.navigate([''])
  }
}
