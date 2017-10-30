import { Component, OnInit, Injectable  } from '@angular/core';
import { Event } from '../events/event.model';
import { Eventos } from '../events/event.model';
import { ActivatedRoute } from '@angular/router';
import { EventServiceService } from '../event-service.service';
import { Attendee } from './edit-Attende/Attendee.model';
import { EditFormComponent } from './edit-Attende/edit-attendee.component';
import { Speaker } from './edit-speakers/Speaker.model';
import { Exhibitor } from './edit-exhibitors/Exhibitor.model';
import { InnerEventsFormComponent } from './edit-inner-events/edit-inner-events.component';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { SubEvent } from './edit-inner-events/SubEvent.model';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})


export class EditEventComponent implements OnInit {
  showEventTab = false;
  showInnerEventTab =false;
  showExhibitorsTab = false;
  showAttendeesTab = false;
  showSpeakersab = false;

  lat: number;
  lng: number ;
  zoom = 15;

  eventToUpdate: Event;
  eventToUpdateId:number;




  // Date Variables
  model;
  model_ends;

  InnerEventmodelStart;
  InnerEventTimeStart= {hour: 11, minute: 31};

  InnerEventmodelEnds;
  InnerEventTimeEnds= {hour: 12, minute: 31};

  time = {hour: 13, minute: 30};
  time_ends = {hour: 12, minute: 20};
  meridian = true;

  eventInfo: Event;
  statusMessage: string;
  AddressList: any;

  // Variable Declarations
  SpeakerList: Speaker[];
  SelectedSpeaker: Speaker;

  AttendeesList: Attendee[];
  SelectedAttende: Attendee;

  ExhibitorsList: Exhibitor[];
  SelectedExhibitor: Exhibitor;

  innerEvents: SubEvent[];
  SelectedInnerEvent: any;



  addEvent(title: string , eventDescription: string) {

    this.innerEvents.unshift(new SubEvent(title, title, title, title, 4));
    console.log(this.innerEvents);
  }

  editinnerEvent(innerevents) {
    this.SelectedInnerEvent =  innerevents;
    
    if ( this.showInnerEventTab === true) {
        this.showInnerEventTab =  false;
    }
  }

  deleteinnerEvent(innerevents) {
    let indexToDelete = this.innerEvents.indexOf(innerevents);
    if (indexToDelete !== -1) {
      this.innerEvents.splice(indexToDelete, 1);
    }
  }







  // Speakers code

  EditExhibitor(exhibitor: Exhibitor) {
    this.SelectedExhibitor =  exhibitor;
    if ( this.showExhibitorsTab === true) {
        this.showExhibitorsTab =  false;
    }
  }
  addExhibitor(name: string, desc: string, email: string , exhibitorRep: string, exhibitorIndustry: string,  exhibitorEvent: ByteString )  {
      this.ExhibitorsList.unshift( new Exhibitor(name, desc, email,  exhibitorRep, exhibitorIndustry, exhibitorEvent, ));
    }

  deleteExhibitor(exhibitor: Exhibitor) {
      let indexToDelete = this.ExhibitorsList.indexOf(exhibitor);
      if (indexToDelete !== -1) {
        this.ExhibitorsList.splice(indexToDelete, 1);
      }
    }


  ////////////////////////////


  // Speakers code
  EditSpeaker(speaker: Speaker) {
    this.SelectedSpeaker =  speaker;
    if ( this.showSpeakersab === true) {
        this.showSpeakersab =  false;
    }
  }
  addSpeaker(name: string, surname: string, email: string,  event: string , industry: string)  {
      this.SpeakerList.unshift( new Speaker(name, surname, email, event, industry));
    }
  deleteSpeaker(event: Speaker) {
      let indexToDelete = this.SpeakerList.indexOf(event);
      if (indexToDelete !== -1) {
        this.SpeakerList.splice(indexToDelete, 1);
      }
    }


  ////////////////////////////

  // Attendees code
  EditAttendee(attende: Attendee) {
    this.SelectedAttende =  attende;
    if ( this.showAttendeesTab === true) {
        this.showAttendeesTab =  false;
    }
  }
  addAttende(name: string, surname: string, email: string)  {
      this.AttendeesList.unshift( new Attendee(name, surname, email));
    }
  delete(event: Attendee) {
      let indexToDelete = this.AttendeesList.indexOf(event);
      if (indexToDelete !== -1) {
        this.AttendeesList.splice(indexToDelete, 1);
      }
    }

//////////////////////////////////////

  // Map variables
  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  staticAlertClosed = true;

  constructor(  private eventService: EventServiceService, 
                private activatedRoute: ActivatedRoute, 
                private ngbDateParserFormatter: NgbDateParserFormatter ) {
                
                  this.AttendeesList = []; 
                  this.SpeakerList = [] ; 
                  this.ExhibitorsList = []; 
                  this.innerEvents = []; 
                }



   added: string;
   postcode: string;
   selectnewAddress = false;
  ngOnInit() {
    this.getEventtoEdit();
    this.getSuvEvents();
    this.added = this.activatedRoute.snapshot.params['added'];
    if(this.added === 'added'){
       this.staticAlertClosed = false;
       setTimeout(() => this.staticAlertClosed = true, 8000);
    }
  }
  
  getSuvEvents() {
    var  ParentEventId: any = this.activatedRoute.snapshot.params['id'];
    this.eventService.getSubEvents(ParentEventId).subscribe(
      (eventData) => {
        if (eventData == null) {
          this.statusMessage = 'Event with given id does not exits' ;
        }else {
        this.innerEvents =  eventData;
        console.log(this.innerEvents);
      } 
    },
    (error) => {
      this.statusMessage = 'Problem with the service';
      console.log(error);
    }
  );
  
}










 
  Start_model;
  Start_time;
  End_model;
  End_time;

  getEventtoEdit() {
    var  eventId: any = this.activatedRoute.snapshot.params['id'];
    this.eventService.getEventById(eventId).subscribe(
      (eventData) => {
        if (eventData == null) {
          this.statusMessage = 'Event with given id does not exits' ;
        }else {
        this.eventInfo =  eventData;
        console.log(this.eventInfo); 
        this.postcode =  this.eventInfo.eventPostcode;
        console.log( this.postcode); 
        this.findAddress(this.postcode);

        var yearStart =  (this.eventInfo.eventStartDate).substr(0,4);
        var monthStart =  (this.eventInfo.eventStartDate).substr(5,2);
        var dayStart =  (this.eventInfo.eventStartDate).substr(8,2);
        var hourStart =  (this.eventInfo.eventStartDate).substr(11,2);        
        var minStart =  (this.eventInfo.eventStartDate).substr(14,2);

        var yearEnd =  (this.eventInfo.eventEndDate).substr(0,4);        
        var monthEnd =  (this.eventInfo.eventEndDate).substr(5,2);
        var dayEnd =  (this.eventInfo.eventEndDate).substr(8,2);
        var hourEnd =  (this.eventInfo.eventEndDate).substr(11,2);
        var minEnd =  (this.eventInfo.eventEndDate).substr(14,2);
       
        this.Start_model= { year: yearStart, month: monthStart, day: dayStart };
        this.Start_time= {hour: hourStart, minute: minStart, second: 30};
      
        this.End_model= { year: yearEnd, month: monthEnd, day: dayEnd };
        this.End_time= {hour: hourEnd, minute: minEnd, second: 30};
        } 
      },
      (error) => {
        this.statusMessage = 'Problem with the service';
        console.log(error);
      }
    );
    
  }

  hourAmStart: string = "T";
  hourAmEnd: string = "T";
  datetimeStart: string;
  datetimeEnd: string;
  thetime: string;

  updateEventInfo(title: string, postcode: string,description: string, street: string){

    if(this.Start_time.hour < 10){this.hourAmStart = "T0"; } 
    if(this.End_time.hour < 10){this.hourAmEnd = "T0"; }

    this.datetimeStart = this.ngbDateParserFormatter.format(this.Start_model) + this.hourAmStart + this.Start_time.hour +":"+  this.Start_time.minute+":"+ this.Start_time.second;
    this.datetimeEnd = this.ngbDateParserFormatter.format(this.End_model) + this.hourAmEnd + this.End_time.hour +":"+  this.End_time.minute+":"+ this.End_time.second;

    console.log(this.datetimeStart );
    console.log(this.datetimeEnd);

    this.eventToUpdateId = this.activatedRoute.snapshot.params['id'];
    this.eventToUpdate =  new Event(title,this.datetimeStart,this.datetimeEnd, postcode, description, street);
    console.log(this.eventToUpdate);

    this.eventService.updateEvent(this.eventToUpdate, this.eventToUpdateId)
    .subscribe((response)=>{
        console.log(response);
        });
  }
    



 findAddress(postcode: string) {
      this.eventService.getEventPostcode(postcode).subscribe(
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
  
 findnewAddress(postcode: string) {
  this.eventService.getEventPostcode(postcode).subscribe(
    (Data) => {
      if (Data == null) {
        this.statusMessage = 'Postcode do not exist!' ;
      }else {}
      this.AddressList =  Data;
      this.lat =  this.AddressList.latitude;
      this.lng =  this.AddressList.longitude;
      console.log(this.AddressList);
      this.selectnewAddress = true;
      console.log(this.selectnewAddress);
    },
    (error) => {
      this.statusMessage = 'Problem with the service';
      console.log(error);
    }
  );
}

/////
}

