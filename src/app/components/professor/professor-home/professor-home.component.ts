import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';


@Component({
  selector: 'app-professor-home',
  templateUrl: './professor-home.component.html',
  styleUrls: ['./professor-home.component.css'],
  providers: [ MessageService ]
})
export class ProfessorHomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
