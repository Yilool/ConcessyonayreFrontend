import { TestBed } from '@angular/core/testing';

import { IsHirerGuard } from './is-hirer.guard';

describe('IsHirerGuard', () => {
  let guard: IsHirerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsHirerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
