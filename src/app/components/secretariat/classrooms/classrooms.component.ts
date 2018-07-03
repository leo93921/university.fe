import { Component, OnInit } from '@angular/core';
import { Classroom } from '../../../models/classroom';
import { ClassroomService } from '../../../services/classroom.service';
import { MessageService } from '../../../services/message.service';
import { SupportDevice } from '../../../models/support-device';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css'],
  providers: [ ClassroomService ]
})
export class ClassroomsComponent implements OnInit {

  classroomList: Classroom[] = [];
  model: Classroom = {} as Classroom;

  constructor(
    private classroomService: ClassroomService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.updateList();
    this.initModel();
  }

  updateList() {
    this.classroomService.getAll().subscribe(list => this.classroomList = list, error => {
      this.messageService.showDanger('Something went wrong. Try again later.');
    });
  }

  saveClassroom() {
    this.classroomService.saveClassroom(this.model).subscribe(saved => {
      this.classroomList.push(saved);
      this.initModel();
    }, error => {
      this.messageService.showDanger('Something went wrong. Try again later.');
    });
  }

  initModel() {
    this.model = {} as Classroom;
    this.model.supportDevices = [];
  }

  addSupportDeviceToModel() {
    this.model.supportDevices.push({} as SupportDevice);
  }

  removeSupportDevice(index: number) {
    this.model.supportDevices.splice(index, 1);
  }
}
