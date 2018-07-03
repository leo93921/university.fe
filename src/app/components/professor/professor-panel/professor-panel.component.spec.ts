import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorPanelComponent } from './professor-panel.component';

describe('ProfessorPanelComponent', () => {
  let component: ProfessorPanelComponent;
  let fixture: ComponentFixture<ProfessorPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
