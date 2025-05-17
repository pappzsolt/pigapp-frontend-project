import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostTotalSummaryComponent } from './cost-total-summary.component';

describe('CostTotalSummaryComponent', () => {
  let component: CostTotalSummaryComponent;
  let fixture: ComponentFixture<CostTotalSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostTotalSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostTotalSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
