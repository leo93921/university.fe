import { Component, OnInit } from '@angular/core';
import { CourseOfStudy } from '../../../models/course-of-study';
import { CourseOfStudyService } from '../../../services/course-of-study.service';
import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../models/subject';
import { SecretariatService } from '../../../services/secretariat.service';
import { Observable, forkJoin } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-teaching-assignment',
  templateUrl: './teaching-assignment.component.html',
  styleUrls: ['./teaching-assignment.component.css'],
  providers: [SubjectService, UserService]
})
export class TeachingAssignmentComponent implements OnInit {

  selectedCOS_ID = null;
  coursesOfStudy: CourseOfStudy[] = [];
  selectedCourseOfStudy: CourseOfStudy;
  subjectList: Subject[] = [];
  subjectModel: Subject = {} as Subject;
  professorList: User[] = [];
  selectedProf_ID = null;
  showSubjectsTable = false;

  constructor(
    private courseOfStudyService: CourseOfStudyService,
    private subjectService: SubjectService,
    private secretariatService: SecretariatService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.courseOfStudyService.getAll().subscribe(list => {
      this.coursesOfStudy = list;
    });
  }

  selectCourseOfStudy(ID: number) {
    this.selectedCourseOfStudy = this.coursesOfStudy.find(cos => cos.id === ID);

    if (this.selectCourseOfStudy) {
      forkJoin (
        this.subjectService.getAllByCourseOfStudy(this.selectedCourseOfStudy),
        this.userService.getAllProfessors()
      ).subscribe(res => {
          this.subjectList = res[0];
          this.professorList = res[1];
          this.subjectModel.courseOfStudy = this.selectedCourseOfStudy;
          this.showSubjectsTable = true;
        },
        error => this.secretariatService.showAlert({
          message: 'Something went wrong. Try again later.',
          type: 'danger'
        })
      );

    } else {
      this.showSubjectsTable = false;
    }
  }

  selectProfessor(ID: number) {
    this.subjectModel.professor = this.professorList.find(prof => prof.id === ID);
  }

  saveSubject() {
    this.subjectService.save(this.subjectModel).subscribe((model) => {
      this.secretariatService.showAlert({
        message: 'The subject has been saved.',
        type: 'success'
      });
      this.updateSubjectList();
    }, error => {
      this.secretariatService.showAlert({
        message: 'Something went wrong. Try again later',
        type: 'danger'
      });
    });
  }

  updateSubjectList() {
    this.subjectService.getAllByCourseOfStudy(this.selectedCourseOfStudy).subscribe(list => {
      this.subjectList = list;
    });
    this.subjectModel = {} as Subject;
    this.selectedCOS_ID = null;
  }
}
