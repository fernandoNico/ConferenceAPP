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
  info: Event;
  tile: string;
  statusMessage: string;

  constructor(private eventService: EventServiceService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    const eventId: number = this.activatedRoute.snapshot.params['id'];

    this.eventService.getEventById(eventId).subscribe(
      (eventData) => this.info =  eventData,
    );

    this.tile =  this.info.name;
    console.log(this.tile);
  }

}
