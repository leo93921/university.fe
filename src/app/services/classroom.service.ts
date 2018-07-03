import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classroom } from '../models/classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private END_POINT = `${environment.BASE_URL}/classroom`;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.END_POINT);
  }

  public saveClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(this.END_POINT, classroom);
  }

  public get(classroomID: number): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.END_POINT}/${classroomID}`);
  }
}
