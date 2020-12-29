import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewExpiredAccountTokenWrapperComponent } from './renew-expired-account-token-wrapper.component';

describe('RenewExpiredAccountTokenWrapperComponent', () => {
  let component: RenewExpiredAccountTokenWrapperComponent;
  let fixture: ComponentFixture<RenewExpiredAccountTokenWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewExpiredAccountTokenWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewExpiredAccountTokenWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
