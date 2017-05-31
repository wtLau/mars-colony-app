import { Component, OnInit } from '@angular/core';
import { Alien } from '../../models/alien';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-aliens',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [ReportService]
})
export class ReportComponent implements OnInit {

  aliens: Alien[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService.getData()
        .subscribe((data) => {
          this.aliens = data.aliens;
        });
  }
}
