import { TestBed } from '@angular/core/testing';

import { CookGuardService } from './cook-guard.service';

describe('CookGuardService', () => {
  let service: CookGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
