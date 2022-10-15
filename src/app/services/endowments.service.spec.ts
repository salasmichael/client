import { TestBed } from '@angular/core/testing';

import { EndowmentsService } from './endowments.service';

describe('EndowmentsService', () => {
  let service: EndowmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndowmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
