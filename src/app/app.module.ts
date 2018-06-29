import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SecretariatHomeComponent } from './components/secretariat/secretariat-home/secretariat-home.component';
import { CourseOfStudyComponent } from './components/secretariat/course-of-study/course-of-study.component';
import { TeachingAssignmentComponent } from './components/secretariat/teaching-assignment/teaching-assignment.component';
import { SecretariatPanelComponent } from './components/secretariat/secretariat-panel/secretariat-panel.component';
import { ProfessorsComponent } from './components/secretariat/professors/professors.component';
import { ClassroomsComponent } from './components/secretariat/classrooms/classrooms.component';

const appRoutes: Routes = [
  { path: 'secretariat', component: SecretariatHomeComponent, children: [
    { path: '', component: SecretariatPanelComponent },
    { path: 'course-of-study', component: CourseOfStudyComponent },
    { path: 'subjects', component: TeachingAssignmentComponent },
    { path: 'professors', component: ProfessorsComponent },
    { path: 'classrooms', component: ClassroomsComponent },
    { path: '**', component: SecretariatPanelComponent}
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
    ClassroomsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
