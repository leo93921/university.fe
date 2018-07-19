import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AcademicYear } from '../models/academic-year';

@Injectable({
  providedIn: 'root'
})
export class AcademicYearService {

  END_POINT = `${environment.BASE_URL}/academic-year`;

  constructor(
    private http: HttpClient
  ) { }

  public getAcademicYears(): Observable<AcademicYear[]> {
    return this.http.get<AcademicYear[]>(`${this.END_POINT}`);
  }

  public saveAcademicYear(academicYear: AcademicYear): Observable<AcademicYear> {
    return this.http.post<AcademicYear>(`${this.END_POINT}`, academicYear);
  }

}
