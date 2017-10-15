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
  statusMessage: string;
  AddressList: any;


  // Map variables
  lat: number;
  lng: number ;
  zoom: number = 15;

  // Date Variables
  model;
  model_ends;
  time = {hour: 13, minute: 30};
  time_ends = {hour: 12, minute: 20};
  meridian = true;
  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  constructor(private eventService: EventServiceService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.getEventtoEdit();
  }
///////
  getEventtoEdit(){
    const eventId: string = this.activatedRoute.snapshot.params['id'];
    this.eventService.getEventById(eventId).subscribe(
      (eventData) => {
        if (eventData == null) {
          this.statusMessage = 'Event with given id does not exits' ;
        }else {}
        this.eventEdit =  eventData;
        console.log(this.eventEdit);
      },
      (error) => {
        this.statusMessage = 'Problem with the service';
        console.log(error);
      }
    );
  }

/////

findAddress(postocode: any) {
      this.eventService.getEventPostcode(postocode).subscribe(
        (Data) => {
          if (Data == null) {
            this.statusMessage = 'Postcode do not exist!' ;
          }else {}
          this.AddressList =  Data;
          this.lat =  this.AddressList.latitude;
          this.lng =  this.AddressList.longitude;
          console.log(this.AddressList);
        },
        (error) => {
          this.statusMessage = 'Problem with the service';
          console.log(error);
        }
      );
    }




/////
}

