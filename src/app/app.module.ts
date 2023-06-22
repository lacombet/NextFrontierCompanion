import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SsoCallbackComponent } from './sso-callback/sso-callback.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { createMap } from '@automapper/core';
import { CharacterDto } from './crest-client/models/dtos/character.dto';
import { Character } from './crest-client/models/business/character.model';
import { mapper } from './crest-client/helpers/mapper.helper';
import { CrendentialsInterceptor } from './crest-client/helpers/credentials.interceptor';
import { NavigationComponent } from './navigation/navigation.component';
import { NgMaterialModule } from './ng-modules/ng-material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SsoCallbackComponent,
    NavigationComponent
  ],
  imports: [
    NgMaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CrendentialsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    AppModule.createAutoMaps();
  }

  private static createAutoMaps() {
    createMap(mapper, CharacterDto, Character)
  }
}
