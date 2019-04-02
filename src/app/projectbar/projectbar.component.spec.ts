import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectbarComponent } from './projectbar.component';

describe('ProjectbarComponent', () => {
  let component: ProjectbarComponent;
  let fixture: ComponentFixture<ProjectbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
