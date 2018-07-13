import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CourseOfStudyService } from '../../../services/course-of-study.service';
import { ClassroomService } from '../../../services/classroom.service';
import { MessageService } from '../../../services/message.service';
import { Classroom } from '../../../models/classroom';
import { CourseOfStudy } from '../../../models/course-of-study';
import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../models/subject';
import { LessonService } from '../../../services/lesson.service';
import { Lesson } from '../../../models/lesson';
import { NgbModal, NgbTimeStruct, NgbDateStruct, NgbModalRef } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modify-lessons',
  templateUrl: './modify-lessons.component.html',
  styleUrls: ['./modify-lessons.component.css']
})
export class ModifyLessonsComponent implements OnInit {

  classList: Classroom[] = [];
  classroomID = null;
  coursesOfStudy: CourseOfStudy[] = [];
  subjectList: Subject[] = [];
  selectedSubject: Subject = {} as Subject;
  selectedSubjectID = null;
  lessons: Lesson[] = [];
  selectedLesson: Lesson = {} as Lesson;
  startDate: NgbDateStruct = {} as NgbDateStruct;
  startTime: NgbTimeStruct = {} as NgbTimeStruct;
  endTime: NgbTimeStruct = {} as NgbTimeStruct;
  modalRef: NgbModalRef;

  constructor(
    private courseOfStudyService: CourseOfStudyService,
    private classroomService: ClassroomService,
    private messageService: MessageService,
    private subjectService: SubjectService,
    private lessonService: LessonService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    forkJoin(
      this.classroomService.getAll(),
      this.courseOfStudyService.getAll()
    ).subscribe( res => {
      this.classList = res[0];
      this.coursesOfStudy = res[1];
    }, error => {
      this.messageService.showDanger('Something went wrong. Please, try again later.');
    });
  }

  selectCourseOfStudy(courseID: number) {
    this.subjectService.getAllByCourseOfStudy(
      this.coursesOfStudy.find(c => c.id === courseID)
    ).subscribe(
      list => this.subjectList = list,
      error => { this.messageService.showDanger('Something went wrong. Please, try again later.'); }
    );
  }

  selectSubject(subjectId: number) {
    this.selectedSubject = this.subjectList.find(item => item.id === subjectId);
    this.lessonService.getBySubject(this.selectedSubject).subscribe(list => {
      this.lessons = list;
    });
  }

  openModal(modal, selectedLesson: Lesson) {
    this.selectedLesson = JSON.parse(JSON.stringify(selectedLesson));
    const _start = new Date(this.selectedLesson.timeSlot.startTime);
    const _end = new Date(this.selectedLesson.timeSlot.endTime);
    this.startDate = {
      year: _start.getFullYear(),
      month: _start.getMonth() + 1,
      day: _start.getDate()
    };
    this.startTime = {
      hour: _start.getHours(),
      minute: _start.getMinutes(),
      second: 0
    };
    this.endTime = {
      hour: _end.getHours(),
      minute: _end.getMinutes(),
      second: 0
    };
    this.classroomID = selectedLesson.classroom.id;
    this.modalRef = this.modalService.open(modal, {size: 'lg'});
  }

  saveLesson() {
    const _newClassroom = this.classList.find(item => item.id === this.classroomID);
    this.selectedLesson.classroom = _newClassroom;
    this.selectedLesson.timeSlot.startTime = new Date(
      this.startDate.year,
      this.startDate.month - 1,
      this.startDate.day,
      this.startTime.hour,
      this.startTime.minute
    ).getTime();
    this.selectedLesson.timeSlot.endTime = new Date(
      this.startDate.year,
      this.startDate.month - 1,
      this.startDate.day,
      this.endTime.hour,
      this.endTime.minute
    ).getTime();
    this.lessonService.saveLesson(this.selectedLesson).subscribe(newLesson => {
      this.modalRef.close();
      this.messageService.showSuccess('The lesson has been updated.');
      this.selectSubject(this.selectedSubject.id);
    }, err => {
      this.modalRef.close();
      this.messageService.showDanger('Something went wrong. Try again later.');
    });
  }
}
