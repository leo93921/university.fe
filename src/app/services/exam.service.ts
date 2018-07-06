import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private END_POINT = `${environment.BASE_URL}/exam`;

  constructor(private http: HttpClient) { }

  public saveExam(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(this.END_POINT, exam);
  }
}
