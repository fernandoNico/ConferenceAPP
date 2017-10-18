import { Component, OnInit, Input } from '@angular/core';
import { Exhibitor } from './Exhibitor.model';

@Component({

  selector: 'app-edit-exhibitor-form',
  templateUrl: './edit-exhibitor.component.html',
})
export class ExhibitorFormComponent implements OnInit {
  @Input() exhibitor: Exhibitor;

  constructor() { }

  ngOnInit() { }
}
