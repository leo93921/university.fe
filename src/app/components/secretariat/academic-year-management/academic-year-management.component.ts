import { Component, OnInit } from '@angular/core';
import { AcademicYear } from '../../../models/academic-year';
import { AcademicYearService } from '../../../services/academic-year.service';
import { NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../../services/message.service';
import { take } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-academic-year-management',
  templateUrl: './academic-year-management.component.html',
  styleUrls: ['./academic-year-management.component.css']
})
export class AcademicYearManagementComponent implements OnInit {

  academicYears: AcademicYear[] = [];
  model: AcademicYear = {} as AcademicYear;
  private modalRef;

  constructor(
    private academicYearService: AcademicYearService,
    private modalService: NgbModal,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.updateList();
  }

  private updateList() {
    this.academicYearService.getAcademicYears().pipe(take(1)).subscribe(list => {
      this.academicYears = list;
    });
  }

  openModal(modal) {
    this.model = {} as AcademicYear;
    this.modalRef = this.modalService.open(modal, {size: 'lg'});
  }

  save() {
    this.academicYearService.saveAcademicYear(this.model).pipe(take(1)).subscribe(saved => {
      this.messageService.showSuccess('The academic year has been saved.');
      this.modalRef.close();
      this.updateList();
    }, err => {
      this.messageService.showDanger('An error occurred. Try again later.');
    });
  }

}
