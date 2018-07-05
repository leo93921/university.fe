import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { SubjectService } from '../../../services/subject.service';
import { Subject } from '../../../models/subject';
import { Lesson } from '../../../models/lesson';
import { LessonFilter } from '../../../models/lesson-filter';
import { LessonService } from '../../../services/lesson.service';
import { TimeSlot } from '../../../models/time-slot';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from '../../../services/document.service';
import { Document } from '../../../models/document';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  subjectList: Subject[] = [];
  selectedSubject: Subject = {} as Subject;
  lessons: Lesson[] = [];
  selectedLesson: Lesson = {} as Lesson;
  documents: Document[] = [];
  filename = '';
  file: File;
  toUpload: Document = {} as Document;
  messageType = 'success';
  messageText = '';
  alertToBeShown = false;

  constructor(
    private localStorage: LocalStorage,
    private subjectService: SubjectService,
    private lessonService: LessonService,
    private modalService: NgbModal,
    private documentService: DocumentService
  ) { }

  ngOnInit() {
    this.localStorage.getItem('loggedUser').subscribe(user => {
      this.subjectService.getByProfessor(user).subscribe(list => {
        this.subjectList = list;
      });
    });
  }

  selectSubject(ID: number) {
    this.selectedSubject = this.subjectList.find(item => item.id === ID);

    const filter = this.initFilter();

    this.lessonService.filterLesson(filter).subscribe(list => {
      this.lessons = list;
    });
  }

  openModal(modal, selectedLesson: Lesson) {
    this.selectedLesson = selectedLesson;
    this.documentService.getDocumentsByLesson(this.selectedLesson).subscribe(list => {
      this.documents = list;
      this.modalService.open(modal, {size: 'lg'});
    });
  }

  change(event: any) {
    this.file = event.target.files[0];
  }

  save() {
    const formData = new FormData();
    formData.append('file', this.file, this.filename);
    formData.append('name', this.toUpload.name);
    formData.append('note', this.toUpload.note);
    formData.append('publishDate', (new Date()).toISOString());
    formData.append('lesson-id', this.selectedLesson.id.toString());
    console.log(formData);

    this.documentService.saveDocument(formData).subscribe(document => {
      this.documents.push(document);
      this.file = null;
      this.toUpload = {} as Document;
      this.messageText = 'Document saved.';
      this.messageType = 'success';
      this.alertToBeShown = true;
    }, error => {
      this.messageText = 'Something went wrong, try again later';
      this.messageType = 'danger';
      this.alertToBeShown = true;
    });
  }

  initFilter(): LessonFilter {
    // By default show the previous 4 days and the next 3
    const start: Date = new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setTime(start.getTime() - (4 * 24 * 60 * 60 * 1000));
    const end: Date = new Date();
    end.setHours(0);
    end.setMinutes(0);
    end.setTime(end.getTime() + (3 * 24 * 60 * 60 * 1000));

    const filter = {} as LessonFilter;
    filter.startTime = {} as TimeSlot;
    filter.endTime = {} as TimeSlot;
    filter.startTime.startTime = start.getTime();
    filter.endTime.endTime = end.getTime();
    filter.subject = this.selectedSubject;

    return filter;
  }

}
