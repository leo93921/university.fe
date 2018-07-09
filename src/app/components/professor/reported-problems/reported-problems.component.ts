import { Component, OnInit } from '@angular/core';
import { Reporting } from '../../../models/reporting';
import { LocalStorage } from '../../../../../node_modules/@ngx-pwa/local-storage';
import { ReportingService } from '../../../services/reporting.service';

@Component({
  selector: 'app-reported-problems',
  templateUrl: './reported-problems.component.html',
  styleUrls: ['./reported-problems.component.css']
})
export class ReportedProblemsComponent implements OnInit {

  problems: Reporting[] = [];

  constructor(
    private localStorage: LocalStorage,
    private reportingService: ReportingService
  ) { }

  ngOnInit() {
    this.localStorage.getItem('loggedUser').subscribe(prof => {
      this.reportingService.findByProfessor(prof).subscribe(list => {
        this.problems = list;
      });
    });
  }

}
