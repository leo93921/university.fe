import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Reporting } from '../models/reporting';
import { User } from '../models/User';
import { Classroom } from '../models/classroom';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  private END_POINT = `${environment.BASE_URL}/reporting`;

  constructor(private http: HttpClient) { }

  public findAllProblems(): Observable<Reporting[]> {
    return this.http.get<Reporting[]>(`${this.END_POINT}/find-all`);
  }

  public getByID(ID: number): Observable<Reporting> {
    return this.http.get<Reporting>(`${this.END_POINT}/${ID}`);
  }

  public saveReporting(reporting: Reporting): Observable<Reporting> {
    return this.http.post<Reporting>(this.END_POINT, reporting);
  }

  public findByProfessor(prof: User): Observable<Reporting[]> {
    return this.http.post<Reporting[]>(`${this.END_POINT}/find-by-professor`, prof);
  }

  public findByClassroom(classroom: Classroom): Observable<Reporting[]> {
    return this.http.post<Reporting[]>(`${this.END_POINT}/find-by-classroom`, classroom);
  }
}
