import { Component, OnInit, Input } from '@angular/core';
import { Speaker } from './Speaker.model';

@Component({

  selector: 'app-edit-speaker-form',
  templateUrl: './edit-speaker.component.html',
})
export class SpeakerFormComponent implements OnInit {
  @Input() speaker: Speaker;

  constructor() { }

  ngOnInit() { }
}
