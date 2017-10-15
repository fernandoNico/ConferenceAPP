import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EventServiceService } from '../event-service.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  AddressList: any;
  model;
  statusMessage: string;

  // lat :number= 52.2458102;
  // lng :number = -0.8924641;
  lat :number;
  lng :number ;
  zoom: number = 15;

  time = {hour: 13, minute: 30};
  time_ends = {hour: 12, minute: 20};
  meridian = true;
  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  constructor(private eventService: EventServiceService) { }
  ngOnInit() {}

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
