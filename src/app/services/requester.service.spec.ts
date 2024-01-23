import { TestBed } from '@angular/core/testing';

import { RequesterService } from './requester.service';

describe('RequesterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequesterService = TestBed.get(RequesterService);
    expect(service).toBeTruthy();
  });
});
