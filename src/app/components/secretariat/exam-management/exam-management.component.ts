import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../../services/classroom.service';
import { SubjectService } from '../../../services/subject.service';
import { forkJoin } from 'rxjs';
import { CourseOfStudy } from '../../../models/course-of-study';
import { CourseOfStudyService } from '../../../services/course-of-study.service';
import { Classroom } from '../../../models/classroom';
import { Subject } from '../../../models/subject';
import { Exam } from '../../../models/exam';
import { TimeSlot } from '../../../models/time-slot';
import { NgbTime } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import { NgbDate } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { checkAndUpdatePureExpressionDynamic } from '../../../../../node_modules/@angular/core/src/view/pure_expression';
import { ExamService } from '../../../services/exam.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-exam-management',
  templateUrl: './exam-management.component.html',
  styleUrls: ['./exam-management.component.css']
})
export class ExamManagementComponent implements OnInit {

  coursesOfStudy: CourseOfStudy[] = [];
  selectedCourseOfStudy: CourseOfStudy = null;
  classrooms: Classroom[] = [];
  subjects: Subject[] = [];
  exam: Exam = {} as Exam;
  examDay: NgbDate = {} as NgbDate;
  endTime: NgbTime = {} as NgbTime;
  startTime: NgbTime = {} as NgbTime;
  subjectID = null;
  classroomID = null;

  constructor(
    private classroomService: ClassroomService,
    private subjectService: SubjectService,
    private courseOfStudyService: CourseOfStudyService,
    private examService: ExamService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.courseOfStudyService.getAll().subscribe(list => {
      this.coursesOfStudy = list;
    });
  }

  selectCourseOfStudy(ID: number) {
    this.selectedCourseOfStudy = this.coursesOfStudy.find(item => item.id === ID);
    this.refreshSelect();
  }

  refreshSelect() {
    forkJoin(
      this.classroomService.getAll(),
      this.subjectService.getAllByCourseOfStudy(this.selectedCourseOfStudy)
    ).subscribe(res => {
      this.classrooms = res[0];
      this.subjects = res[1];
      this.initExam();
    });
  }

  initExam() {
    this.exam = {
      classroom: null,
      subject: null,
      timeslot: {} as TimeSlot,
      id: null,
      description: ''
    };
    this.subjectID = null;
    this.classroomID = null;
  }

  saveExam() {
    // Parse dates
    const examDate = new Date();
    examDate.setFullYear(this.examDay.year, this.examDay.month - 1, this.examDay.day);
    const examStart = new Date(examDate.getTime());
    examStart.setHours(this.startTime.hour);
    examStart.setMinutes(this.startTime.minute);
    const examEnd = new Date(examDate.getTime());
    examEnd.setHours(this.endTime.hour);
    examEnd.setMinutes(this.endTime.minute);

    // Set timeslot for the exam
    this.exam.timeslot = {
      id: null,
      startTime: examStart.getTime(),
      endTime: examEnd.getTime()
    };

    // Set the classroom and the subject
    this.exam.classroom = this.classrooms.find(item => item.id === +this.classroomID);
    this.exam.subject = this.subjects.find(item => item.id === +this.subjectID);

    // Save the exam
    this.examService.saveExam(this.exam).subscribe(exam => {
      this.messageService.showSuccess('The exam has been saved successfully.');
      this.initExam();
    }, error => {
      this.messageService.showDanger('Something went wrong, try again later.');
    });
  }
}
