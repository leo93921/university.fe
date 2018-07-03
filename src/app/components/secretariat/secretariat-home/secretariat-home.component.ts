import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { SecretariatService } from '../../../services/secretariat.service';
import { CourseOfStudyService } from '../../../services/course-of-study.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secretariat-home',
  templateUrl: './secretariat-home.component.html',
  styleUrls: ['./secretariat-home.component.css'],
  providers: [ SecretariatService, CourseOfStudyService ]
})
export class SecretariatHomeComponent implements OnInit {

  private loggedUser: User;

  constructor(
    public secretariatService: SecretariatService,
    private localStorage: LocalStorage,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.localStorage.removeItem('loggedUser').subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
