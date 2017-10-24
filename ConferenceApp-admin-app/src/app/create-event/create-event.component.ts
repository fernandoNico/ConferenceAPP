import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EventServiceService } from '../event-service.service';

import { Event, Eventos } from '../events/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  AddressList: any;
  model;
  model_ends;
  statusMessage: string;

  dateStart: any ;
  dateEnd: any ;

  lat :number;
  lng :number ;
  zoom: number = 15;

  newEvent : Event;

  time = {hour: 13, minute: 30};
  time_ends = {hour: 12, minute: 20};

  meridian = true;
  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  

  eventTitle : any;


  constructor(private eventService: EventServiceService, private router: Router) { }
  ngOnInit() {}


  addEvent(title : string ,postcode : string ,description :  string){
    this.eventTitle = title;
    console.log(this.eventTitle);
    this.newEvent =  new Event(title, postcode, description, postcode, description);
    this.eventService.addEventos(this.newEvent)
    .subscribe((response)=>{
    console.log(response);
      if (response) {
        this.router.navigate(['event/', this.eventTitle]);
        }
    });
  }

 

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

}
