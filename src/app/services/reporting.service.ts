import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reporting } from '../models/reporting';

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

}
