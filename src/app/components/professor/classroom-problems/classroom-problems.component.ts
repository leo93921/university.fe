import { Component, OnInit } from '@angular/core';
import { Classroom } from '../../../models/classroom';
import { ClassroomService } from '../../../services/classroom.service';
import { Reporting } from '../../../models/reporting';
import { ReportingService } from '../../../services/reporting.service';

@Component({
  selector: 'app-classroom-problems',
  templateUrl: './classroom-problems.component.html',
  styleUrls: ['./classroom-problems.component.css']
})
export class ClassroomProblemsComponent implements OnInit {

  classrooms: Classroom[] = [];
  problems: Reporting[] = [];

  constructor(
    private classroomService: ClassroomService,
    private reportingService: ReportingService
  ) { }

  ngOnInit() {
    this.classroomService.getAll().subscribe(list => {
      this.classrooms = list;
    });
  }

  selectClassroom(classID: number) {
    const selectClassroom = this.classrooms.find(item => item.id === classID);
    this.reportingService.findByClassroom(selectClassroom).subscribe(list => {
      this.problems = list;
    });
  }

}
