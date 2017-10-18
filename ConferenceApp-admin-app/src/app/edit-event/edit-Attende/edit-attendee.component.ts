import { Component, OnInit, Input } from '@angular/core';
import { Attendee } from './Attendee.model';

@Component({

  selector: 'app-edit-attende-form',
  templateUrl: './edit-attendee.component.html',
})
export class EditFormComponent implements OnInit {
  @Input() attendee: Attendee;

  constructor() { }

  ngOnInit() { }
}
