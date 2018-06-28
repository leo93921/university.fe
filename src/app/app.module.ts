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

const appRoutes: Routes = [
  { path: 'secretariat', component: SecretariatHomeComponent, children: [
    { path: '', redirectTo: 'course-of-study', pathMatch: 'full' },
    { path: 'course-of-study', component: CourseOfStudyComponent },
    { path: 'subjects', component: TeachingAssignmentComponent }
  ]},
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SecretariatHomeComponent,
    CourseOfStudyComponent,
    TeachingAssignmentComponent
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
