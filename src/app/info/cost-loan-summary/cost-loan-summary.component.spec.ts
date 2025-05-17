import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostLoanSummaryComponent } from './cost-loan-summary.component';

describe('CostLoanSummaryComponent', () => {
  let component: CostLoanSummaryComponent;
  let fixture: ComponentFixture<CostLoanSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostLoanSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostLoanSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
