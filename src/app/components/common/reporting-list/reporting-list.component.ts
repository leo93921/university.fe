import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Reporting } from '../../../models/reporting';
import { REPORT_STATUS_TRANSLATION } from '../../../models/reporting-status';

@Component({
  selector: 'app-reporting-list',
  templateUrl: './reporting-list.component.html',
  styleUrls: ['./reporting-list.component.css']
})
export class ReportingListComponent implements OnInit {

  @Input() problems: Reporting[] = [];
  statusTranslation = REPORT_STATUS_TRANSLATION;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToProblem(problemID: number) {
    this.router.navigateByUrl(`/problem/${problemID}`);
  }

}



