import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Invoice, InvoiceSummary, TotalAmountInvoice } from '../../../model/invoice';
import { UpcomingCost } from '../../../model/cost';
import { TailwindStyledSelectDirective } from '../../shared/directives/tailwind-styled-select.directive';
@Component({
  selector: 'app-invoice-summary-viewer',
  standalone: true,
  imports: [CommonModule, TailwindStyledSelectDirective],
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
