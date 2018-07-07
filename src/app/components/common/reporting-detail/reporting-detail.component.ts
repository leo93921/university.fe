import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '../../../../../node_modules/@angular/router';
import { ReportingService } from '../../../services/reporting.service';
import { Reporting } from '../../../models/reporting';

@Component({
  selector: 'app-reporting-detail',
  templateUrl: './reporting-detail.component.html',
  styleUrls: ['./reporting-detail.component.css']
})
export class ReportingDetailComponent implements OnInit {

  problem: Reporting = {} as Reporting;
  model: Reporting = {} as Reporting;
  reportStatuses = [
    { status: 'REPORTED', display: 'Reported' },
    { status: 'WORKING_ON_IT', display: 'Working on it' },
    { status: 'FIXED', display: 'Fixed' },
    { status: 'NOT_FIXED', display: 'Not fixed' },
    { status: 'NOT_A_PROBLEM', display: 'Not a problem' },
    { status: 'DELAYED', display: 'Delayed' }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private reportingService: ReportingService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      this.reportingService.getByID(id).subscribe(reporting => {
        this.setReporting(reporting);
      });
    });
  }

  saveReporting() {
    this.model.lastModified = (new Date()).getTime();
    this.reportingService.saveReporting(this.model).subscribe(rep => {
      this.setReporting(rep);
    });
  }

  setReporting(modelFromHttp: Reporting) {
    this.problem = modelFromHttp;

    this.model.reportingStatus = modelFromHttp.reportingStatus;
    this.model.classroom = modelFromHttp.classroom;
    this.model.description = modelFromHttp.description;
    this.model.doneBy = modelFromHttp.doneBy;
    this.model.id = modelFromHttp.id;
    this.model.supportDevice = modelFromHttp.supportDevice;
    this.model.reportingStatus = modelFromHttp.reportingStatus;

  }
}
