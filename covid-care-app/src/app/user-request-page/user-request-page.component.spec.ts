import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestPageComponent } from './user-request-page.component';

describe('UserRequestPageComponent', () => {
  let component: UserRequestPageComponent;
  let fixture: ComponentFixture<UserRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
