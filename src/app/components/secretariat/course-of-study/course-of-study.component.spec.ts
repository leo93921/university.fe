import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOfStudyComponent } from './course-of-study.component';

describe('CourseOfStudyComponent', () => {
  let component: CourseOfStudyComponent;
  let fixture: ComponentFixture<CourseOfStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseOfStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOfStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
