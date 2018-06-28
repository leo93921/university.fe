import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseOfStudy } from '../models/course-of-study';

@Injectable({
  providedIn: 'root'
})
export class CourseOfStudyService {

  private END_POINT = `${environment.BASE_URL}/course-of-study`;

  constructor(private http: HttpClient) { }

  save(courseOfStudy: CourseOfStudy): Observable<CourseOfStudy> {
    return this.http.post<CourseOfStudy>(`${this.END_POINT}`, courseOfStudy);
  }
}
