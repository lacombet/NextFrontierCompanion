import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { SsoCallbackComponent } from './sso-callback/sso-callback.component';

const routes: Routes = [
  { path: '', component: AppComponent, },
  { path: 'home', component: HomeComponent },
  { path: 'sso_callback', component: SsoCallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
