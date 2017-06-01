import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Colonist } from '../models/colonist';

@Injectable()
export class ColonistService {
  private COLONIST_URL = 'https://red-wdp-api.herokuapp.com/api/mars/colonists';

    constructor(private http: Http) { }

    postData(colonist) {
      const headers = new Headers ({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers });
      return this.http.post(this.COLONIST_URL, {colonist}, options)
                      .map(this.extractData);
    }

    extractData(res: Response) {
      const colonist = res.json();
      return colonist;
    }

    handleError() {
      console.log('There was an error');
    }
}
