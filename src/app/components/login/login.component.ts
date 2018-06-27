import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserCredentials } from '../../models/UserCredentials';
import { User } from '../../models/User';

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

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  formSubmitted() {
    this.userService.checkCredentials(this.userCredentials)
      .subscribe((user: User) => {
        console.log(user);
      });
  }

}
