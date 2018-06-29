import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserService} from '../../../services/user.service';
import { SecretariatService } from '../../../services/secretariat.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.css'],
  providers: [UserService]
})
export class ProfessorsComponent implements OnInit {

  profList: User[] = [];
  prof: User = {} as User;

  constructor(
    private userService: UserService,
    private secretariatService: SecretariatService
  ) {}

  ngOnInit() {
    this.initProfessor();
    this.updateProfessorList();
  }

  updateProfessorList() {
    this.userService.getAllProfessors().subscribe(list => {
      this.profList = list;
    }, error => {
      this.secretariatService.showAlert({
        message: 'Something went wrong. Try again later',
        type: 'danger'
      });
    });
  }

  saveProfessor() {
    this.userService.registerUser(this.prof).subscribe(user => {
      this.profList.push(user);
      this.secretariatService.showSuccess('The professor has been saved successfully');
      this.initProfessor();
    }, error => {
      this.secretariatService.showAlert({
        message: 'Something went wrong. Try again later',
        type: 'danger'
      });
    });
  }

  initProfessor(): void {
    this.prof = {} as User;
    this.prof.userType = environment.PROFESSOR_TYPE;
  }
}
