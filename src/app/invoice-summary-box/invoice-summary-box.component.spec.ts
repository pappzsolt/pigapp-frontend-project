import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSummaryBoxComponent } from './invoice-summary-box.component';

describe('InvoiceSummaryBoxComponent', () => {
  let component: InvoiceSummaryBoxComponent;
  let fixture: ComponentFixture<InvoiceSummaryBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceSummaryBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceSummaryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
