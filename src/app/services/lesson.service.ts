import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson } from '../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private END_POINT = `${environment.BASE_URL}/lesson`;

  constructor(private http: HttpClient) { }

  public saveLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(this.END_POINT, lesson);
  }

}
