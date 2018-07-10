import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { map,  } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SecretariatSectionGuard implements CanActivate {

  constructor(
    private localStorage: LocalStorage
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.localStorage.getItem('loggedUser').pipe(
        map((user: User) => {
          console.log(user);
          if (user && user.userType === 'SECRETARIAT') {
            return true;
          } else {
            return false;
          }
        })
      );
  }
}
