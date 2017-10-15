import { Component, OnInit, Injectable  } from '@angular/core';
import { Event } from '../events/event.model';
import { ActivatedRoute } from '@angular/router';
import { EventServiceService } from '../event-service.service';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})


export class EditEventComponent implements OnInit {
  eventEdit: Event;
  tile: string;
  statusMessage: string;

  constructor(private eventService: EventServiceService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    const eventId: string = this.activatedRoute.snapshot.params['id'];

    this.eventService.getEventById(eventId).subscribe(
      (eventData) => {
        if (eventData == null) {
          this.statusMessage = 'Event with given id does not exits' ;
        }else {}
        this.eventEdit =  eventData;
        console.log(this.eventEdit);
        this.tile =  this.eventEdit.name;
        console.log(this.tile);
      },
      (error) => {
        this.statusMessage = 'Problem with the service';
        console.log(error);
      }
    );

    // this.tile =  this.eventEdit.name;
    
  }

}
