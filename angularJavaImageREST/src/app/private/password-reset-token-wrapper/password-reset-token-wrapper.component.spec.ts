import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetTokenWrapperComponent } from './password-reset-token-wrapper.component';

describe('PasswordResetTokenWrapperComponent', () => {
  let component: PasswordResetTokenWrapperComponent;
  let fixture: ComponentFixture<PasswordResetTokenWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordResetTokenWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetTokenWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
