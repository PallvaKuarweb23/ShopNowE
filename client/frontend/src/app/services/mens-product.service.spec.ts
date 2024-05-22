import { TestBed } from '@angular/core/testing';

import { MensProductService } from './mens-product.service';

describe('MensProductService', () => {
  let service: MensProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
