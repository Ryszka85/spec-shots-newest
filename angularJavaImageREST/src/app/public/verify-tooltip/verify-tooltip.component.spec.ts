import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTooltipComponent } from './verify-tooltip.component';

describe('VerifyTooltipComponent', () => {
  let component: VerifyTooltipComponent;
  let fixture: ComponentFixture<VerifyTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
