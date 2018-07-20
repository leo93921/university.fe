import { Component, OnInit } from '@angular/core';
import { AcademicYearService } from '../../../services/academic-year.service';
import { AcademicYear } from '../../../models/academic-year';
import { CourseOfStudy } from '../../../models/course-of-study';
import { CourseOfStudyService } from '../../../services/course-of-study.service';
import { MessageService } from '../../../services/message.service';
import { forkJoin } from '../../../../../node_modules/rxjs';
import { take } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-course-of-study',
  templateUrl: './course-of-study.component.html',
  styleUrls: ['./course-of-study.component.css'],
  providers: [ AcademicYearService ]
})
export class CourseOfStudyComponent implements OnInit {

  academicYears: AcademicYear[] = [];
  model: CourseOfStudy = {
    name: '',
    academicYear: null,
    id: null
  };
  selAY = null;
  coursesOfStudy: CourseOfStudy[] = [];

  constructor(
    private academicYearService: AcademicYearService,
    private courseOfStudyService: CourseOfStudyService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.updateLists();
  }

  updateLists() {
    forkJoin(
      this.academicYearService.getAcademicYears(),
      this.courseOfStudyService.getAll()
    ).pipe(take(1)).subscribe(res => {
      this.academicYears = res[0];
      this.coursesOfStudy = res[1];
    });
  }

  selectAcademicYear(event: any) {
    if (+event.target.value === -1) {
      this.model.academicYear = null;
      return;
    }
    const selectedId = +event.target.value;
    const selected = this.academicYears.find(ay => ay.id === selectedId);
    this.model.academicYear = selected;
  }

  saveCourse() {
    this.courseOfStudyService.save(this.model).subscribe(saved => {
      this.messageService.showAlert({type: 'success', message: 'The course of study has been saved'});
      this.updateLists();
    },
      error => {
        this.messageService.showAlert({type: 'danger', message: 'An error occurred, please retry.'});
      }
  );
  }
}
