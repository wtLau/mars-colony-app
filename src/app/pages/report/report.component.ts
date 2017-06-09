import { Component, OnInit } from '@angular/core';
import { Alien } from '../../models/alien';
import { AlienService } from '../../services/alien.service';

import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';

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

@Component({
  selector: 'app-aliens',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AlienService, ReportService],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class ReportComponent implements OnInit {

  aliens: Alien[] = [];
  report: Report;
  reportForm: FormGroup;
  NO_ALIEN_SELECTED = 'no alien';


  constructor
  (
    private alienService: AlienService,
    private reportService: ReportService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.alienService.getData()
      .subscribe((data) => {
        this.aliens = data.aliens;
      });

    this.reportForm = new FormGroup({
      alien_id: new FormControl(this.NO_ALIEN_SELECTED, [cantBe(this.NO_ALIEN_SELECTED)]),
      action: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(3)
      ]),
    });
  }


  reported(e) {
    e.preventDefault();
    if (this.reportForm.invalid) {
      // the form is invalid
    } else {
      const atype = this.reportForm.get('alien_id').value;
      const action = this.reportForm.get('action').value;
      const date = new Date;
      const prettyDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
      const report_id = window.localStorage.userID;
      const report = new Report(atype, prettyDate, action, report_id);
      console.log(report);

      this.reportService.postData(report)
                          .subscribe((data) => {
                            this.router.navigate(['encounters']);
                          });
    }
  }


}
