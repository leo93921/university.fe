import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { SecretariatService } from '../../../services/secretariat.service';

@Component({
  selector: 'app-secretariat-home',
  templateUrl: './secretariat-home.component.html',
  styleUrls: ['./secretariat-home.component.css'],
  providers: [ SecretariatService ]
})
export class SecretariatHomeComponent implements OnInit {

  private loggedUser: User;

  constructor(
    public secretariatService: SecretariatService
  ) { }

  ngOnInit() {
  }

}
