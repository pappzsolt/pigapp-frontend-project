import { TestBed } from '@angular/core/testing';

import { MonthlyCalculationService } from './monthly-calculation.service';

describe('MonthlyCalculationService', () => {
  let service: MonthlyCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
