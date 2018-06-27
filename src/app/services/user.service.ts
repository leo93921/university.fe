import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserCredentials } from '../models/UserCredentials';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private END_POINT = 'http://localhost:8080/university.be/user';

  constructor(private http: HttpClient) { }

  public checkCredentials(credentials: UserCredentials): Observable<User> {
    return this.http.post<User>(`${this.END_POINT}/login`, credentials);
  }
}
