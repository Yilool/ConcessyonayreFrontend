import { TestBed } from '@angular/core/testing';

import { IsSellerGuard } from './is-seller.guard';

describe('IsSellerGuard', () => {
  let guard: IsSellerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsSellerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
