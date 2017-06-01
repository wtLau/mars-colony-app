import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { JOBService } from '../../services/register.service';

import { Colonist } from '../../models/colonist';
import { ColonistService } from '../../services/colonist.service';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JOBService, ColonistService]
})
export class RegisterComponent implements OnInit {

  jobs: Job[] = [];
  colonist: Colonist;

  constructor
  (
    private JOBService: JOBService,
    private colonistService: ColonistService
  ) {}


  ngOnInit() {
    this.JOBService.getData()
        .subscribe((data) => {
          console.log(data);
          this.jobs = data.jobs;
        });
  };

  postColonist() {
    const colonist = new Colonist('Brian', '44', '4');
    this.colonistService.postData(colonist)
                        .subscribe((newColonist) => {
                          console.log(newColonist);
                        });
  };
}
