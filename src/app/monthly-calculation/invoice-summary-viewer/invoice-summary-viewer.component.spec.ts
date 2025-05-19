import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSummaryViewerComponent } from './invoice-summary-viewer.component';

describe('InvoiceSummaryViewerComponent', () => {
  let component: InvoiceSummaryViewerComponent;
  let fixture: ComponentFixture<InvoiceSummaryViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceSummaryViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceSummaryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
