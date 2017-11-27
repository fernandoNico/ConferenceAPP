import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { SubEvent } from './SubEvent.model';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { EventServiceService } from '../../event-service.service';



@Component({

  selector: 'app-inner-events-form',
  templateUrl: './edit-inner-events.component.html',
})
export class InnerEventsFormComponent implements OnInit {

  @Output() refresh = new EventEmitter();


  @Input() set innerEvent(event:SubEvent){
        this.subEventToedit =  event;
        if (this.subEventToedit) {
          console.log(this.subEventToedit);
          let eventData = JSON.parse(JSON.stringify(this.subEventToedit));
          this.title = eventData['innerEventTitle'];
          this.description = eventData['innerEventDescription'];
          this.startDate = eventData['innerEventStartDate'];
          this.endDate = eventData['innerEventEndDate'];
          this.eventId= eventData['innerEventID'];
          this.ParentId =  eventData['EventId'];

          var yearStart =  (this.startDate).substr(0,4);
          var monthStart =  (this.startDate).substr(5,2);
          var dayStart =  (this.startDate).substr(8,2);
          var hourStart =  (this.startDate).substr(11,2);        
          var minStart =  (this.startDate).substr(14,2);

          var yearEnd =  (this.endDate).substr(0,4);
          var monthEnd =  (this.endDate).substr(5,2);
          var dayEnd =  (this.endDate).substr(8,2);
          var hourEnd =  (this.endDate).substr(11,2);        
          var minEnd =  (this.endDate).substr(14,2);
        
          this.InnerEventStart_model= { year: yearStart, month: monthStart, day: dayStart };
          this.InnerEventStart_time= {hour: hourStart, minute: minStart, second: 30};
        
          this.InnerEventEnd_model= { year: yearEnd, month: monthEnd, day: dayEnd };
          this.InnerEventEnd_time= {hour: hourEnd, minute: minEnd, second: 30};

          // console.log(this.title);
          // console.log(this.description);
          // console.log(this.startDate);
          // console.log(this.endDate);
        }
  }

  get innerEvent(){
    return this.subEventToedit;
  }
  subEventToedit: SubEvent;

  eventId: number;
  title : string;
  description: string;
  startDate: string;
  endDate: string;
  ParentId: number;

  InnerEventStart_model;
  InnerEventEnd_model ;

  InnerEventStart_time;
  InnerEventEnd_time;
  meridian = true;

  SubEventToUpdate: SubEvent;

  constructor(private eventService: EventServiceService, private ngbDateParserFormatter: NgbDateParserFormatter) { }

  ngOnInit() {}

  subEventDateTimeStart: string;
  subEventDateTimeEnd: string;

  ConfirmChanges(title: string, description: string) {
    

  this.subEventDateTimeStart = this.ngbDateParserFormatter.format(this.InnerEventStart_model) +" "+ this.InnerEventStart_time.hour +":"+  this.InnerEventStart_time.minute+":"+ this.InnerEventStart_time.second;
  this.subEventDateTimeEnd = this.ngbDateParserFormatter.format(this.InnerEventEnd_model)  +" "+ this.InnerEventEnd_time.hour +":"+  this.InnerEventEnd_time.minute+":"+ this.InnerEventEnd_time.second;

  // let nose =  title +" "+ description;
  //   console.log(nose);
  console.log(this.subEventDateTimeStart);
  console.log(this.subEventDateTimeEnd);



  this.SubEventToUpdate =  new SubEvent(title,this.subEventDateTimeStart,this.subEventDateTimeEnd,  description, this.ParentId );
  

  console.log(this.SubEventToUpdate);
  this.eventService.updateSubEvent( this.SubEventToUpdate, this.eventId)
  .subscribe((response)=>{
      console.log(response);
      this.refresh.emit();
  });



  // console.log(this.eventToUpdateId);

  // this.eventService.updateEvent(this.eventToUpdate, this.llave)
  // .subscribe((response)=>{
  //     console.log(response);
  //     // this.router.navigate(['event/', title,'edited']);
  //          this.staticAlertClosed1 = false;
  //   setTimeout(() => this.staticAlertClosed1 = true, 8000);
  //     });

  }







  
}
