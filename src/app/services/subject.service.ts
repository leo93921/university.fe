import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';
import { CourseOfStudy } from '../models/course-of-study';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private END_POINT = `${environment.BASE_URL}/subject`;

  constructor(private http: HttpClient) { }

  public getAllByCourseOfStudy(cs: CourseOfStudy): Observable<Subject[]> {
    return this.http.post<Subject[]>(`${this.END_POINT}/find-by-course`, cs);
  }

  public save(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.END_POINT, subject);
  }
}
