import { TestBed } from '@angular/core/testing';

import { InvoiceTransformService } from './invoice-transform.service';

describe('InvoiceTransformService', () => {
  let service: InvoiceTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
