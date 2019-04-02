import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulebarComponent } from './modulebar.component';

describe('ModulebarComponent', () => {
  let component: ModulebarComponent;
  let fixture: ComponentFixture<ModulebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
