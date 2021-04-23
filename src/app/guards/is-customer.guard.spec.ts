import { TestBed } from '@angular/core/testing';

import { IsCustomerGuard } from './is-customer.guard';

describe('IsCustomerGuard', () => {
  let guard: IsCustomerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsCustomerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
