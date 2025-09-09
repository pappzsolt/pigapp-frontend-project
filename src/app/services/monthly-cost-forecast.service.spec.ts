import { TestBed } from '@angular/core/testing';

import { MonthlyCostForecastService } from './monthly-cost-forecast.service';

describe('MonthlyCostForecastService', () => {
  let service: MonthlyCostForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyCostForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
