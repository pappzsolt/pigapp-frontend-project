import { TestBed } from '@angular/core/testing';

import { CostRepeatWithSumService } from './cost-repeat-with-sum.service';

describe('CostRepeatWithSumService', () => {
  let service: CostRepeatWithSumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostRepeatWithSumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
