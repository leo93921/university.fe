import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';

@Component({
  selector: 'app-secretariat-home',
  templateUrl: './secretariat-home.component.html',
  styleUrls: ['./secretariat-home.component.css']
})
export class SecretariatHomeComponent implements OnInit {

  private loggedUser: User;

  constructor() { }

  ngOnInit() {
  }

}
