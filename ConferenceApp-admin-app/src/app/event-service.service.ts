import { Injectable } from '@angular/core';
import { Http, HttpModule, Response } from '@angular/http';
import { Observable  } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

import { Event } from './events/event.model';

@Injectable()
export class EventServiceService {

  constructor(private http: Http) {}

  getEvents() {
    return this.http.get(('https://sheetsu.com/apis/v1.0/c081ec92ea8d'))
    .map((res: Response) => res.json()).catch(this.handleError);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get('https://sheetsu.com/apis/v1.0/c081ec92ea8d/search?id=' + id )
    .map((response: Response) => <Event>response.json()).catch(this.handleError);
  }

  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error);
  }





}
