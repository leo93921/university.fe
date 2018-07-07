import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../../services/reporting.service';
import { Reporting } from '../../../models/reporting';

@Component({
  selector: 'app-reporting-management',
  templateUrl: './reporting-management.component.html',
  styleUrls: ['./reporting-management.component.css']
})
export class ReportingManagementComponent implements OnInit {

  problems: Reporting[] = [];

  constructor(
    private reportingService: ReportingService
  ) { }

  ngOnInit() {
    this.reportingService.findAllProblems().subscribe(list => {
      this.problems = list;
    });
  }

}
