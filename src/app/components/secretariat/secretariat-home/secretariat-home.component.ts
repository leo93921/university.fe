import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { MessageService } from '../../../services/message.service';
import { CourseOfStudyService } from '../../../services/course-of-study.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-secretariat-home',
  templateUrl: './secretariat-home.component.html',
  styleUrls: ['./secretariat-home.component.css'],
  providers: [ MessageService, CourseOfStudyService ]
})
export class SecretariatHomeComponent implements OnInit {

  private loggedUser: User;

  constructor(
    public messageService: MessageService,
    private localStorage: LocalStorage,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
