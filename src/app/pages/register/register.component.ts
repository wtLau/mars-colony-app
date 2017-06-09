import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { JOBService } from '../../services/register.service';

import { Colonist } from '../../models/colonist';
import { ColonistService } from '../../services/colonist.service';

import { Router } from '@angular/router';

import { slideInOutAnimation } from '../../animations/animation';


import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';

const cantBe = (value: string): ValidatorFn => {
  return (control: AbstractControl) => {
      return control.value === value ? { 'Cant\'be this value': value } : null;
  };
};

const age = (tooYoung: number, tooOld: number): ValidatorFn => {
  if (tooYoung < 0 || tooOld < 0) {
    throw new Error('You can\'t be negative age...');
  }
  return (control: AbstractControl) => {
    return control.value < 0 || control.value < tooYoung || control.value > tooOld ?
      { 'You\'re not the right age...': age } : null;
  };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JOBService, ColonistService],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class RegisterComponent implements OnInit {

  jobs: Job[] = [];
  colonist: Colonist;
  registerForm: FormGroup;
  NO_JOB_SELECTED = 'no job';

  constructor
  (
    private JOBService: JOBService,
    private colonistService: ColonistService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit() {

    this.JOBService.getData()
        .subscribe((data) => {
          this.jobs = data.jobs;
        });

    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(3)
      ]),
      age: new FormControl('', [Validators.required, age(16, 35)]),
      job_id: new FormControl(this.NO_JOB_SELECTED, [cantBe(this.NO_JOB_SELECTED)])
    });
  };


  register(e) {
    e.preventDefault();
    if (this.registerForm.invalid) {
      // the form is invalid
    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;

      const colonist = new Colonist(name, age, job_id);

      console.log(colonist);

      this.colonistService.postData(colonist)
                          .subscribe((newColonist) => {
                            window.localStorage.setItem(
                              'userID', newColonist.colonist.id);
                            this.router.navigate(['encounters']);
                          });

      }
  }
}
