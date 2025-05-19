import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invoice, InvoiceSummary, TotalAmountInvoice } from '../../../model/invoice';
import { UpcomingCost } from '../../../model/cost';

@Component({
  selector: 'app-invoice-summary-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-summary-viewer.component.html',
})
export class InvoiceSummaryViewerComponent {
  @Input() isLoading: boolean = false;
  @Input() errorMessage: string = '';
  @Input() totalAmountInvoice?: TotalAmountInvoice;
  @Input() invoices: Invoice[] = [];
  @Input() invoiceSummaries: InvoiceSummary[] = [];
  @Input() upcomingCosts: UpcomingCost[] = [];
}
