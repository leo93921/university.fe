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

}
