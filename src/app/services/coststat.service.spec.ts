import { TestBed } from '@angular/core/testing';

import { CoststatService } from './coststat.service';

describe('CoststatService', () => {
  let service: CoststatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoststatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
