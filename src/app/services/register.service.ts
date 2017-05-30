import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Job } from '../models/job';

@Injectable()
export class JOBService {

  private JOB_URL = 'https://red-wdp-api.herokuapp.com/api/mars/jobs';

  constructor(private http: Http) { }

  getData() {
    return this.http.get(this.JOB_URL)
                    .map(this.extractJobs);
  }

  extractJobs(res: Response) {
    const job = res.json();
    return job;
  }

  handleError() {
    console.log('There was an error');
  }

}
