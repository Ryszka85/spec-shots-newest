import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewExpiredAccountTokenComponent } from './renew-expired-account-token.component';

describe('RenewExpiredAccountTokenComponent', () => {
  let component: RenewExpiredAccountTokenComponent;
  let fixture: ComponentFixture<RenewExpiredAccountTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewExpiredAccountTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewExpiredAccountTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
