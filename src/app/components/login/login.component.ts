import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserCredentials } from '../../models/UserCredentials';
import { User } from '../../models/User';

import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {

  userCredentials: UserCredentials = {
    username: '',
    password: ''
  };
  showError = false;

  constructor(
    private userService: UserService,
    private localStorage: LocalStorage,
    private router: Router
  ) { }

  ngOnInit() {
    this.localStorage.getItem('loggedUser').subscribe(user => {
      if (user) {
        this.goToHome();
      }
    });
  }

  formSubmitted() {
    this.userService.checkCredentials(this.userCredentials)
      .subscribe((user: User) => {
        console.log(user);
        if (user) {
          this.localStorage.setItem('loggedUser', user).subscribe(() => {
            this.goToHome();
          });
        }
      }, error => {
        this.showError = true;
      });
  }

  goToHome(): void {
    this.router.navigateByUrl('home');
  }

}
