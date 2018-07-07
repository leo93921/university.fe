import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SecretariatHomeComponent } from './components/secretariat/secretariat-home/secretariat-home.component';
import { CourseOfStudyComponent } from './components/secretariat/course-of-study/course-of-study.component';
import { TeachingAssignmentComponent } from './components/secretariat/teaching-assignment/teaching-assignment.component';
import { SecretariatPanelComponent } from './components/secretariat/secretariat-panel/secretariat-panel.component';
import { ProfessorsComponent } from './components/secretariat/professors/professors.component';
import { ClassroomsComponent } from './components/secretariat/classrooms/classrooms.component';
import { LessonsManagementComponent } from './components/secretariat/lessons-management/lessons-management.component';
import { ProfessorHomeComponent } from './components/professor/professor-home/professor-home.component';
import { ProfessorPanelComponent } from './components/professor/professor-panel/professor-panel.component';
import { UploadDocumentComponent } from './components/professor/upload-document/upload-document.component';
import { ExamManagementComponent } from './components/secretariat/exam-management/exam-management.component';
import { ReportingManagementComponent } from './components/secretariat/reporting-management/reporting-management.component';

const appRoutes: Routes = [
  { path: 'secretariat', component: SecretariatHomeComponent, children: [
    { path: '', component: SecretariatPanelComponent },
    { path: 'course-of-study', component: CourseOfStudyComponent },
    { path: 'subjects', component: TeachingAssignmentComponent },
    { path: 'professors', component: ProfessorsComponent },
    { path: 'classrooms', component: ClassroomsComponent },
    { path: 'lessons', component: LessonsManagementComponent },
    { path: 'exams', component: ExamManagementComponent },
    { path: 'problems', component: ReportingManagementComponent },
    { path: '**', component: SecretariatPanelComponent}
  ]},
  { path: 'professor', component: ProfessorHomeComponent, children: [
    { path: '', component: ProfessorPanelComponent },
    { path: 'upload-document', component: UploadDocumentComponent },
    { path: '**', component: ProfessorPanelComponent }
  ]},
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SecretariatHomeComponent,
    CourseOfStudyComponent,
    TeachingAssignmentComponent,
    SecretariatPanelComponent,
    ProfessorsComponent,
    ClassroomsComponent,
    LessonsManagementComponent,
    ProfessorHomeComponent,
    ProfessorPanelComponent,
    UploadDocumentComponent,
    ExamManagementComponent,
    ReportingManagementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
