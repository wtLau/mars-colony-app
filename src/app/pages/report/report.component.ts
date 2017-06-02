import { Component, OnInit } from '@angular/core';
import { Alien } from '../../models/alien';
import { AlienService } from '../../services/alien.service';

import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';

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
  providers: [AlienService, ReportService]
})
export class ReportComponent implements OnInit {

  aliens: Alien[] = [];
  report: Report;
  reportForm: FormGroup;
  NO_ALIEN_SELECTED = "no alien";


  constructor
  (
    private alienService: AlienService,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.alienService.getData()
      .subscribe((data) => {
        this.aliens = data.aliens;
      });

    this.reportForm = new FormGroup({
      alien_id: new FormControl(this.NO_ALIEN_SELECTED, [cantBe(this.NO_ALIEN_SELECTED)])
    });
  }

  postReport() {
  const report = new Report('Octospider', '2017-5-29', 'web developer', '4');
  this.reportService.postData(report)
                      .subscribe((newReport) => {
                        console.log(newReport);
                      });
  };

  register(e) {
    e.preventDefault();
    if (this.reportForm.invalid) {
      // the form is invalid
    } else {
      const alien_id = this.reportForm.get('aliens').value;
      // const colonist = new Colonist(name, age, job_id);
    }
  }
}
