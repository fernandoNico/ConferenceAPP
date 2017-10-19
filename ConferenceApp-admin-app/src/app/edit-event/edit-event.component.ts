import { Component, OnInit, Injectable  } from '@angular/core';
import { Event } from '../events/event.model';
import { ActivatedRoute } from '@angular/router';
import { EventServiceService } from '../event-service.service';
import { Attendee } from './edit-Attende/Attendee.model';
import { EditFormComponent } from './edit-Attende/edit-attendee.component';
import { Speaker } from './edit-speakers/Speaker.model';
import { Exhibitor } from './edit-exhibitors/Exhibitor.model';
import { InnerEventsFormComponent } from './edit-inner-events/edit-inner-events.component';



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

  eventEdit: Event;
  statusMessage: string;
  AddressList: any;

  // Variable Declarations
  SpeakerList: Speaker[];
  SelectedSpeaker: Speaker;

  AttendeesList: Attendee[];
  SelectedAttende: Attendee;

  ExhibitorsList: Exhibitor[];
  SelectedExhibitor: Exhibitor;

  innerEvents: Array <any[]>;
  SelectedInnerEvent: any;



  addEvent(title: string , eventDescription: string) {

    this.innerEvents.unshift(new Array(title, eventDescription, this.InnerEventmodelStart ,
               this.InnerEventTimeStart, this.InnerEventmodelEnds , this.InnerEventTimeEnds));
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


  constructor(private eventService: EventServiceService, private activatedRoute: ActivatedRoute ) {
            this.AttendeesList = []; this.SpeakerList = [] ; this.ExhibitorsList = []; this.innerEvents = [];
   }

  ngOnInit() {
    this.getEventtoEdit();
  }
///////
  getEventtoEdit() {
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

