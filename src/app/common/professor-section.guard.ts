import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ProfessorSectionGuard implements CanActivate {

  constructor(
    private localStorage: LocalStorage
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.localStorage.getItem('loggedUser').pipe(map((user: User) => {
        if (user && user.userType === 'PROFESSOR') {
          return true;
        } else {
          return false;
        }
      }));
  }
}
