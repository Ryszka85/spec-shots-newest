import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredTokenRefreshWrapperComponent } from './expired-token-refresh-wrapper.component';

describe('ExpiredTokenRefreshWrapperComponent', () => {
  let component: ExpiredTokenRefreshWrapperComponent;
  let fixture: ComponentFixture<ExpiredTokenRefreshWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredTokenRefreshWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredTokenRefreshWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
