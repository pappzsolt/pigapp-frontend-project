import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceSummaryBoxComponent } from '../invoice-summary-box/invoice-summary-box.component';
import { Invoice } from '../../model/invoice';
import { InvoiceCostSummary } from '../../model/invoice-cost-summary.model';

@Component({
  selector: 'app-invoice-summary-panel',
  standalone: true,
  imports: [CommonModule, InvoiceSummaryBoxComponent],
  templateUrl: './invoice-summary-panel.component.html',
})
export class InvoiceSummaryPanelComponent {
  @Input() summaries: InvoiceCostSummary[] = [];
  @Input() startOfMonth!: Date;
  @Input() endOfMonth!: Date;

  @Output() invoiceSelected = new EventEmitter<Invoice>();
  @Output() invoiceChanged = new EventEmitter<Invoice>();
}


