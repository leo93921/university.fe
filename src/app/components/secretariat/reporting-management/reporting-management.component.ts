import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../../services/reporting.service';
import { Reporting } from '../../../models/reporting';
import { Classroom } from '../../../models/classroom';
import { ClassroomService } from '../../../services/classroom.service';
import { forkJoin } from 'rxjs';
import { REPORT_STATUSES } from '../../../models/reporting-status';

@Component({
  selector: 'app-reporting-management',
  templateUrl: './reporting-management.component.html',
  styleUrls: ['./reporting-management.component.css']
})
export class ReportingManagementComponent implements OnInit {

  problems: Reporting[] = [];
  unfilteredProblems: Reporting[] = [];
  classrooms: Classroom[] = [];
  reportStatuses = REPORT_STATUSES;
  selectedStatus = '';

  filterHidden = true;

  constructor(
    private reportingService: ReportingService,
    private classroomService: ClassroomService
  ) { }

  ngOnInit() {
    forkJoin(
      this.reportingService.findAllProblems(),
      this.classroomService.getAll()
    ).subscribe(res => {
      this.problems = res[0];
      this.unfilteredProblems = JSON.parse(JSON.stringify(res[0]));

      this.classrooms = res[1];
    });
  }

  selectClassroom(id: number) {
    this.selectedStatus = '';
    if (isNaN(id)) {
      // show all problems
      this.reportingService.findAllProblems().subscribe(list => {
        this.problems = list;
        this.unfilteredProblems = JSON.parse(JSON.stringify(list));
      });
    } else {
      const selectedClassroom = this.classrooms.find(item => item.id === id);
      this.reportingService.findByClassroom(selectedClassroom).subscribe(list => {
        this.problems = list;
        this.unfilteredProblems = JSON.parse(JSON.stringify(list));
      });
    }
  }

  filterByStatus() {
    if (this.selectedStatus !== '') {
      this.problems = this.unfilteredProblems.filter(item => item.reportingStatus === this.selectedStatus);
    } else {
      this.problems = JSON.parse(JSON.stringify(this.unfilteredProblems));
    }
  }

  toggleFilter() {
    this.filterHidden = !this.filterHidden;
  }
}
