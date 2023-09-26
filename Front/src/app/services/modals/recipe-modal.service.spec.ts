import { TestBed } from '@angular/core/testing';

import { RecipeModalService } from './recipe-modal.service';

describe('RecipeModalService', () => {
  let service: RecipeModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
