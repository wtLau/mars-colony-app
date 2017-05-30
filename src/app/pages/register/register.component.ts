import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';

import { JOBService } from '../../services/register.service';

@Component({
  selector: 'app-encounters',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JOBService]
})
export class RegisterComponent implements OnInit {

  jobs: Job[] = [];

  constructor(private JOBService: JOBService) {}

  ngOnInit() {
    this.JOBService.getData()
        .subscribe((data) => {
          console.log(data);
          this.jobs = data.jobs;
        });
  }
}
