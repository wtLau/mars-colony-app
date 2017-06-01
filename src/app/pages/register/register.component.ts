import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { JOBService } from '../../services/register.service';

import { Colonist } from '../../models/colonist';
import { ColonistService } from '../../services/colonist.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JOBService, ColonistService]
})
export class RegisterComponent implements OnInit {

  jobs: Job[] = [];
  colonist: Colonist;
  registerForm: FormGroup;
  NO_JOB_SELECTED = '(none)';

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

    this.registerForm = new FormGroup ({
      name: new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(3)
        ]),
      age: new FormControl( '', [Validators.required]),
      job_id: new FormControl( 'this.NO_JOB_SELECTED', [] ),
    })
  };

  postColonist() {
    const colonist = new Colonist('Brian', '44', '4');
    this.colonistService.postData(colonist)
                        .subscribe((newColonist) => {
                          console.log(newColonist);
                        });
  };
}
