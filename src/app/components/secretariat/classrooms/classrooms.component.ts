import { Component, OnInit } from '@angular/core';
import { Classroom } from '../../../models/classroom';
import { ClassroomService } from '../../../services/classroom.service';
import { MessageService } from '../../../services/message.service';
import { SupportDevice } from '../../../models/support-device';
import { take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css'],
  providers: [ ClassroomService ]
})
export class ClassroomsComponent implements OnInit {

  classroomList: Classroom[] = [];
  model: Classroom = {} as Classroom;
  marker: Marker = {} as Marker;
  modalRef;

  constructor(
    private classroomService: ClassroomService,
    private messageService: MessageService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.updateList();
    this.initModel();
  }

  updateList() {
    this.classroomService.getAll().subscribe(list => {
      this.classroomList = [];
      this.classroomList = list;
    }, error => {
      this.messageService.showDanger('Something went wrong. Try again later.');
    });
  }

  saveClassroom() {
    this.model.latitude = this.marker.lat;
    this.model.longitude = this.marker.lng;
    this.classroomService.saveClassroom(this.model).subscribe(saved => {
      this.messageService.showSuccess('The classroom has been saved.');
      this.updateList();
      this.modalRef.close();
    }, error => {
      this.messageService.showDanger('Something went wrong. Try again later.');
    });
  }

  openModal(modal) {
    this.initModel();
    this.modalRef = this.modalService.open(modal, {size: 'lg'});
  }

  initModel() {
    this.model = {} as Classroom;
    this.model.supportDevices = [];
    this.marker = {} as Marker;
  }

  addSupportDeviceToModel() {
    this.model.supportDevices.push({} as SupportDevice);
  }

  removeSupportDevice(index: number) {
    this.model.supportDevices.splice(index, 1);
  }

  deleteClassroom(classroom: Classroom) {
    this.classroomService.deleteClassroom(classroom).pipe(take(1)).subscribe(res => {
      this.messageService.showSuccess('The classroom has been deleted');
      this.updateList();
    }, err => this.messageService.showDanger('Something went wrong. Try again.'));
  }

  selectClassroom(classroom: Classroom) {
    this.model = classroom;
    this.marker = {
      lat: classroom.latitude,
      lng: classroom.longitude,
      label: classroom.name,
      draggable: true
    };
  }

  mapClicked($event) {
    this.marker = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    };
  }
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
