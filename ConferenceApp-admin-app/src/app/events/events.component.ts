import { Component, OnInit, Injectable } from '@angular/core';
import { EventServiceService } from '../event-service.service';
import { Event } from './event.model';
import { Http, Response} from '@angular/http';




@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event[];
  selectedEvent: Event;

  constructor(private eventService: EventServiceService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => this.events = events);
  }

  onselectedEvent(event: Event) {
  this.selectedEvent =  event;
  }

}
