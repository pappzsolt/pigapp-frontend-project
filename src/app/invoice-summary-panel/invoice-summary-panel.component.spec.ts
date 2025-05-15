import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSummaryPanelComponent } from './invoice-summary-panel.component';

describe('InvoiceSummaryPanelComponent', () => {
  let component: InvoiceSummaryPanelComponent;
  let fixture: ComponentFixture<InvoiceSummaryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceSummaryPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceSummaryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
