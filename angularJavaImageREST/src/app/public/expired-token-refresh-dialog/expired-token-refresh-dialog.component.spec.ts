import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredTokenRefreshDialogComponent } from './expired-token-refresh-dialog.component';

describe('ExpiredTokenRefreshDialogComponent', () => {
  let component: ExpiredTokenRefreshDialogComponent;
  let fixture: ComponentFixture<ExpiredTokenRefreshDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredTokenRefreshDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredTokenRefreshDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
