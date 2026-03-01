import { TestBed } from '@angular/core/testing';

import { CostPastService } from './cost-past.service';

describe('CostPastService', () => {
  let service: CostPastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostPastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
