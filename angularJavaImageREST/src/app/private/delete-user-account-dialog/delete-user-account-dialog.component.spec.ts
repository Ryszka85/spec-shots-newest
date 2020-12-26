import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserAccountDialogComponent } from './delete-user-account-dialog.component';

describe('DeleteUserAccountDialogComponent', () => {
  let component: DeleteUserAccountDialogComponent;
  let fixture: ComponentFixture<DeleteUserAccountDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUserAccountDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
