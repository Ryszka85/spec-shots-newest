import { TestBed } from '@angular/core/testing';

import { PaswordResetGuard } from './pasword-reset.guard';

describe('PaswordResetGuard', () => {
  let guard: PaswordResetGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PaswordResetGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
