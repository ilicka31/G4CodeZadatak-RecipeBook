import { TestBed } from '@angular/core/testing';

import { CookModalService } from './cook-modal.service';

describe('CookModalService', () => {
  let service: CookModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
