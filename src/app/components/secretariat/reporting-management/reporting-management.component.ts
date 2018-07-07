import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../../services/reporting.service';
import { Reporting } from '../../../models/reporting';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-reporting-management',
  templateUrl: './reporting-management.component.html',
  styleUrls: ['./reporting-management.component.css']
})
export class ReportingManagementComponent implements OnInit {

  problems: Reporting[] = [];

  constructor(
    private reportingService: ReportingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.reportingService.findAllProblems().subscribe(list => {
      this.problems = list;
    });
  }

  goToProblem(problemID: number) {
    this.router.navigateByUrl(`/problem/${problemID}`);
  }
}
