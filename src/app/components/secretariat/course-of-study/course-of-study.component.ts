import { Component, OnInit } from '@angular/core';
import { AcademicYearService } from '../../../services/academic-year.service';
import { AcademicYear } from '../../../models/academic-year';
import { CourseOfStudy } from '../../../models/course-of-study';
import { CourseOfStudyService } from '../../../services/course-of-study.service';
import { SecretariatService } from '../../../services/secretariat.service';

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

  constructor(
    private academicYearService: AcademicYearService,
    private courseOfStudyService: CourseOfStudyService,
    private secreatariatService: SecretariatService
  ) { }

  ngOnInit() {
    this.academicYearService.getAcademicYears().subscribe(list => {
      this.academicYears = list;
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
      this.secreatariatService.showAlert({type: 'success', message: 'The course of study has been saved'});
    },
      error => {
        this.secreatariatService.showAlert({type: 'danger', message: 'An error occurred, please retry.'});
      }
  );
  }
}
