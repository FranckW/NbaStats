import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { People } from './people';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  public getJSON(): Observable<People[]> {
    // Via un Observable/Observer, lecture du JSON et injection vers les composants observer
    return this.http.get('./assets/datas.json')
      .map(res => {
        return res.json();
      });
  }


}
