import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailViewerComponent } from './invoice-detail-viewer.component';

describe('InvoiceDetailViewerComponent', () => {
  let component: InvoiceDetailViewerComponent;
  let fixture: ComponentFixture<InvoiceDetailViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDetailViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceDetailViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
