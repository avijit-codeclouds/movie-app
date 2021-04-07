import { TestBed } from '@angular/core/testing';

import { GenerService } from './gener.service';

describe('GenerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerService = TestBed.get(GenerService);
    expect(service).toBeTruthy();
  });
});
