import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson } from '../models/lesson';
import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private END_POINT = `${environment.BASE_URL}/document`;

  constructor(private http: HttpClient) { }

  public getDocumentsByLesson(lesson: Lesson): Observable<Document[]> {
    return this.http.post<Document[]>(`${this.END_POINT}/find-by-lesson`, lesson);
  }

  public saveDocument(form: FormData): Observable<Document> {
    return this.http.post<Document>(this.END_POINT, form);
  }

  public deleteDocument(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.END_POINT}/${id}`);
  }

}
