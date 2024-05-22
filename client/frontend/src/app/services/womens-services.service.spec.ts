import { TestBed } from '@angular/core/testing';

import { WomensServicesService } from './womens-services.service';

describe('WomensServicesService', () => {
  let service: WomensServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WomensServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
