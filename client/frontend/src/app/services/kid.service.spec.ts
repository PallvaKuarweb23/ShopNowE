import { TestBed } from '@angular/core/testing';

import { KidService } from './kid.service';

describe('KidService', () => {
  let service: KidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
