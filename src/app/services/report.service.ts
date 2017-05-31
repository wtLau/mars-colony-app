import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Alien } from '../models/alien';

@Injectable()
export class ReportService {
  private ALIENS_URL = 'https://red-wdp-api.herokuapp.com/api/mars/aliens';

  constructor(private http: Http) { }

  getData() {
    return this.http.get(this.ALIENS_URL)
                    .map(this.extractAliens);
  }

  extractAliens(res: Response) {
    const alien = res.json();
    return alien;
  }

  handleError() {
    console.log('There was an error');
  }

}
 