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

  toDeleteId:number;

  constructor(private eventService: EventServiceService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => this.events = events);
  }

  onselectedEvent(event: Event) {
  this.selectedEvent =  event;
  }

  deleteEvent(event: Event){
    this.toDeleteId = event.EventId;
    
    this.eventService.deleteEvent(this.toDeleteId).subscribe(
    result => console.log(result));  

    let indexToDelete = this.events.indexOf(event);
      if (indexToDelete !== -1) {
        this.events.splice(indexToDelete, 1);
      }
    
    console.log(this.toDeleteId);

  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
}

}
