import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Routes, RouterModule, Router, ActivatedRoute  } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { SignupComponentComponent } from './signup-component/signup-component.component';
import { HelpComponentComponent } from './help-component/help-component.component';
import { EventsComponent } from './events/events.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { Http, HttpModule} from '@angular/http';

import { EventServiceService } from './event-service.service';

const routes: Routes = [
  { path: 'signup', component: SignupComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'home', component: HomeComponentComponent },
  { path: 'help', component: HelpComponentComponent },
  { path: 'events', component: EventsComponent },
  { path: 'create', component: CreateEventComponent },
  { path: 'event/:id', component: EditEventComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: HomeComponentComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    HeaderComponentComponent,
    SignupComponentComponent,
    LoginComponentComponent,
    HelpComponentComponent,
    EventsComponent,
    CreateEventComponent,
    EditEventComponent
  ],
  imports: [
    BrowserModule, NgbModule.forRoot(), FormsModule, HttpModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [EventServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
