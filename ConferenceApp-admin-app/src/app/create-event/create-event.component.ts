import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  model;

  time = {hour: 13, minute: 30};
  time_ends = {hour: 12, minute: 20};
  meridian = true;

  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  constructor() { }

  ngOnInit() {
  }

}
