import { Component, OnInit } from '@angular/core';
import { Reporting } from '../../../models/reporting';
import { Classroom } from '../../../models/classroom';
import { ClassroomService } from '../../../services/classroom.service';
import { SupportDevice } from '../../../models/support-device';
import { LocalStorage } from '../../../../../node_modules/@ngx-pwa/local-storage';
import { ReportingService } from '../../../services/reporting.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.css']
})
export class ReportProblemComponent implements OnInit {

  model: Reporting = {} as Reporting;
  classes: Classroom[] = [];
  selectedClassroom: Classroom = {} as Classroom;
  selectedDevice: SupportDevice = {} as SupportDevice;

  // for the form selects
  classID = null;
  deviceID = null;

  constructor(
    private classroomService: ClassroomService,
    private localStorage: LocalStorage,
    private reportingService: ReportingService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.classroomService.getAll().subscribe(list => {
      this.classes = list;
    });
    this.localStorage.getItem('loggedUser').subscribe(user => {
      this.model.doneBy = user;
    });
  }

  selectClassroom(classId: number) {
    this.selectedClassroom = this.classes.find(item => item.id === classId);
    this.deviceID = null;
  }

  selectDevice(deviceId: number) {
    this.selectedDevice = this.selectedClassroom.supportDevices.find(item => item.id === deviceId);
  }

  saveReport() {
    // fill the model
    this.model.classroom = this.selectedClassroom;
    this.model.supportDevice = this.selectedDevice;
    this.model.reportingStatus = 'REPORTED';
    this.model.lastModified = Date.now();
    this.reportingService.saveReporting(this.model).subscribe(saved => {
      this.messageService.showSuccess('The problem has been reported successfully.');
      this.classID = null;
      this.deviceID = null;
      this.model.description = '';
    }, error => {
      this.messageService.showDanger('Something went wrong, please try again.');
    });
  }
}
