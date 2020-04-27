import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalNeedyRequestComponent } from './medical-needy-request.component';

describe('MedicalNeedyRequestComponent', () => {
  let component: MedicalNeedyRequestComponent;
  let fixture: ComponentFixture<MedicalNeedyRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalNeedyRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalNeedyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
