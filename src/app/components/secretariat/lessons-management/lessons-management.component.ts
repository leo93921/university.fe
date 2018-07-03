import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Lesson } from '../../../models/lesson';
import { Classroom } from '../../../models/classroom';
import { Subject } from '../../../models/subject';
import { SubjectService } from '../../../services/subject.service';
import { ClassroomService } from '../../../services/classroom.service';
import { CourseOfStudyService } from '../../../services/course-of-study.service';
import { CourseOfStudy } from '../../../models/course-of-study';
import { MessageService } from '../../../services/message.service';
import { TimeSlot } from '../../../models/time-slot';
import { LessonService } from '../../../services/lesson.service';

@Component({
  selector: 'app-lessons-management',
  templateUrl: './lessons-management.component.html',
  styleUrls: ['./lessons-management.component.css'],
  providers: [ SubjectService, ClassroomService, CourseOfStudyService, LessonService ]
})
export class LessonsManagementComponent implements OnInit {

  selectedSubjectID = null;
  classroomID = null;
  day = null;
  isRecurrent = false;
  startDate = {
    year: null,
    month: null,
    day: null
  };
  endDate = {
    year: null,
    month: null,
    day: null
  };
  startTime = {
    hour: null,
    minute: null
  };
  endTime = {
    hour: null,
    minute: null
  };

  lesson: Lesson = {
    classroom: {} as Classroom,
    subject: {} as Subject,
    timeSlot: {} as TimeSlot,
    id: null
  };
  classList: Classroom[] = [];
  subjectList: Subject[] = [];
  coursesOfStudy: CourseOfStudy[] = [];

  constructor(
    private classroomService: ClassroomService,
    private subjectService: SubjectService,
    private courseOfStudyService: CourseOfStudyService,
    private messageService: MessageService,
    private lessonService: LessonService,
    private router: Router
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

  saveLesson() {
    const aStartDate = new Date(
      this.startDate.year,
      (this.startDate.month - 1),
      this.startDate.day,
      this.startTime.hour,
      this.startTime.minute);
    const aEndDate = new Date(this.endDate.year,
      (this.endDate.month - 1),
      this.endDate.day,
      this.endTime.hour,
      this.endTime.minute);

    // print error if start > end
    if (aStartDate >= aEndDate) {
      this.messageService.showDanger('Start date must be greater than the end date.');
      return;
    }
    const datesToBeSaved = this.getAllTheDaysInInterval(aStartDate, aEndDate, this.day);

    const activeClassroom = this.classList.find(c => c.id === +this.classroomID);
    const activeSubject = this.subjectList.find(s => s.id === +this.selectedSubjectID);

    const lessonList: Lesson[] = [];

    datesToBeSaved.forEach(item => {
      const activeEnd: Date = new Date(item.getTime());
      activeEnd.setHours(this.endTime.hour);
      activeEnd.setMinutes(this.endTime.minute);

      const aLesson: Lesson = {
        classroom: activeClassroom,
        id: null,
        subject: activeSubject,
        timeSlot: {
          id: null,
          startTime: item.getTime(),
          endTime: activeEnd.getTime()
        }
      };

      lessonList.push(aLesson);
    });

    const observableList = [];
    lessonList.map((lesson, lessonIdx) => {
      observableList.push(this.lessonService.saveLesson(lesson));
    });

    forkJoin(observableList).subscribe(
      res => {
        this.messageService.showSuccess('The lessons have been saved.');
        this.router.navigateByUrl('/secretariat');
      });

  }

  getAllTheDaysInInterval(startDate: Date, endDate: Date, dayOfTheWeek: string): Date[] {
    const allValidDays: Date[] = [];
    let theDay: number;
    switch (dayOfTheWeek) {
      case 'Monday':
        theDay = 1; break;
      case 'Tuesday':
        theDay = 2; break;
      case 'Wednesday':
        theDay = 3; break;
      case 'Thursday':
        theDay = 4; break;
      case 'Friday':
        theDay = 5; break;
      case 'Saturday':
        theDay = 6; break;
      default:
        theDay = 0; // Sunday
    }
    // day is within 7 days
    let i = 0;
    let firstValidDay: Date;
    while (i < 7) {
      firstValidDay = new Date(startDate.getTime() + i * (60 * 60 * 24 * 1000));
      if (firstValidDay.getDay() === theDay) { break; }
      i++;
    }
    allValidDays.push(firstValidDay);
    // Do a while skipping 7 days at a time and while the current date is less than the last selected date
    i = 7;
    let nextValidDate = new Date(firstValidDay.getTime() + i * (60 * 60 * 24 * 1000));
    while (nextValidDate < endDate) {
      allValidDays.push(nextValidDate);
      i = i + 7;
      nextValidDate = new Date(firstValidDay.getTime() + i * (60 * 60 * 24 * 1000));
    }
    return allValidDays;
  }
}
