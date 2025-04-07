import { TestBed } from '@angular/core/testing';

import { CashFlowServiceService } from './cash-flow.service.service';

describe('CashFlowServiceService', () => {
  let service: CashFlowServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashFlowServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
