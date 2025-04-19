import { TestBed } from '@angular/core/testing';

import { AutoCostService } from './auto-cost.service';

describe('AutoCostService', () => {
  let service: AutoCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
