import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EventServiceService } from '../event-service.service';

import { Event, Eventos } from '../events/event.model';
import { Router } from '@angular/router';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

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

  time = {hour: 13, minute: 30, second:30};
  time_ends = {hour: 12, minute: 20 , second:30};

  meridian = true;
  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  

  street : any;
  datetimeStart: string;
  datetimeEnd: string;

  constructor(private eventService: EventServiceService, private router: Router, private ngbDateParserFormatter: NgbDateParserFormatter) { }
  ngOnInit() {
  
  }

  // Get the selected street address
  public onChange(event): void {  // event will give you full breif of action
    this.street = event.target.value;
    console.log(this.street);
  }
 
  hourAmStart: string = "T";
  hourAmEnd: string = "T";
  addEvent(title : string ,postcode : string ,description :  string ){
   
    if(this.time.hour < 10){this.hourAmStart = "T0"; } 
    if(this.time_ends.hour < 10){this.hourAmEnd = "T0"; }

    this.datetimeStart = this.ngbDateParserFormatter.format(this.model) + this.hourAmStart + this.time.hour +":"+  this.time.minute+":"+ this.time.second;
    this.datetimeEnd = this.ngbDateParserFormatter.format(this.model_ends) + this.hourAmEnd + this.time_ends.hour +":"+  this.time_ends.minute+":"+ this.time_ends.second;

    console.log(this.datetimeStart );
    console.log(this.datetimeEnd);

    this.newEvent =  new Event(title, this.datetimeStart, this.datetimeEnd, postcode, description, this.street);
    this.eventService.addEventos(this.newEvent)
    .subscribe((response)=>{
    console.log(response);
      if (response) {
        this.router.navigate(['event/', title,'added']);
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
        console.log(this.AddressList.addresses[0]);
      },
      (error) => {
        this.statusMessage = 'Problem with the service';
        console.log(error);
      }
    );
  }

}
