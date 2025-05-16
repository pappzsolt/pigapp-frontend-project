import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSummaryCardComponent } from './invoice-summary-card.component';

describe('InvoiceSummaryCardComponent', () => {
  let component: InvoiceSummaryCardComponent;
  let fixture: ComponentFixture<InvoiceSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceSummaryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
