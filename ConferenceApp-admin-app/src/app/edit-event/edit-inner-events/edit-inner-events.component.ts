import { Component, OnInit, Input } from '@angular/core';

@Component({

  selector: 'app-inner-events-form',
  templateUrl: './edit-inner-events.component.html',
})
export class InnerEventsFormComponent implements OnInit {
  @Input() innerEvent: Array<any>;

  constructor() { }

  ngOnInit() {
  }

  ConfirmChanges() {}
}
