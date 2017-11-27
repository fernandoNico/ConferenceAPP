import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EventServiceService } from '../event-service.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Event, Eventos } from '../events/event.model';
import { Router } from '@angular/router';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  AddressList: any;
  statusMessage: string;


  model: NgbDateStruct;
  model_ends: NgbDateStruct;

  
  
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
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.model_ends = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  // Get the selected street address
  public onChange(event): void {  // event will give you full breif of action
    this.street = event.target.value;
    console.log(this.street);
  }
 
  // hourAmStart: string = "T";
  // hourAmEnd: string = "T";
  addEvent(title : string ,postcode : string ,description :  string ){
   
    // if(this.time.hour < 10){this.hourAmStart = " 0"; } 
  //   if(this.time.minute == 0){this.hourAmStart = "10";
  //   console.log(this.time.minute);
  // } 

    // if(this.time_ends.hour < 10){this.hourAmEnd = " 0"; }
    // if(this.time_ends.minute ==0){this.hourAmEnd = "10";
    // console.log(this.time_ends.minute); }

    this.datetimeStart = this.ngbDateParserFormatter.format(this.model) +" "+ this.time.hour +":"+  this.time.minute+":"+ this.time.second;
    this.datetimeEnd = this.ngbDateParserFormatter.format(this.model_ends) +" "+ this.time_ends.hour +":"+  this.time_ends.minute+":"+ this.time_ends.second;

    // this.datetimeStart = this.ngbDateParserFormatter.format(this.model) + this.hourAmStart + this.time.hour +":"+  this.time.minute+":"+ this.time.second;
    // this.datetimeEnd = this.ngbDateParserFormatter.format(this.model_ends) + this.hourAmEnd + this.time_ends.hour +":"+  this.time_ends.minute+":"+ this.time_ends.second;

    console.log(this.datetimeStart );
    console.log(this.datetimeEnd);

    this.newEvent =  new Event(title, this.datetimeStart, this.datetimeEnd, postcode, description, this.street);
    this.eventService.addEvent(this.newEvent)
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
