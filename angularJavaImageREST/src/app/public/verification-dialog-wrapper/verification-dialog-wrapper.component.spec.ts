import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationDialogWrapperComponent } from './verification-dialog-wrapper.component';

describe('VerificationDialogWrapperComponent', () => {
  let component: VerificationDialogWrapperComponent;
  let fixture: ComponentFixture<VerificationDialogWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDialogWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDialogWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
