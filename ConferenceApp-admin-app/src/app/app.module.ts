import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { SignupComponentComponent } from './signup-component/signup-component.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'home', component: HomeComponentComponent },
  { path: '**', component: HomeComponentComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    HeaderComponentComponent,
    SignupComponentComponent,
    LoginComponentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
