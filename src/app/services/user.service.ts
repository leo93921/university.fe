import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { UserCredentials } from '../models/UserCredentials';
import { User } from '../models/User';
import { LocalStorage } from '@ngx-pwa/local-storage';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private END_POINT = `${environment.BASE_URL}/user`;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage
  ) { }

  public checkCredentials(credentials: UserCredentials): Observable<User> {
    return this.http.post<User>(`${this.END_POINT}/login`, credentials);
  }

  public getAllProfessors(): Observable<User[]> {
    return this.http.get<User[]>(`${this.END_POINT}/all-professors`);
  }

  public registerUser(userWithPassword: User): Observable<User> {
    return this.http.post<User>(`${this.END_POINT}/register`, userWithPassword);
  }

  public logout(): Observable<boolean> {
    return this.localStorage.removeItem('loggedUser');
  }
}
