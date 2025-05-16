import { Invoice, InvoiceOption } from '../../../model/invoice';
import { CommonModule } from '@angular/common';
import { Component, Inject, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { InvoiceComponent } from '../../invoice/invoice.component';
import { InvoicesService } from '../../services/invoices.service';
import { InvoiceCostSummaryService } from '../../services/invoice-cost-summary.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceCostSummary } from '../../../model/invoice-cost-summary.model';

@Component({
  selector: 'app-invoice-card',
  standalone: true,
  imports: [CommonModule, InvoiceComponent],
  template: `
    <div
      class="bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-600 p-4 rounded-2xl shadow"
    >
      <app-invoice
        (invoiceSelected)="onInvoiceSelected(invoice)"
        (invoiceChanged)="onInvoiceChanged(invoice)"
        [invoice]="invoice"
        [invoiceIndex]="index"
      >
      </app-invoice>
    </div>
  `,
})
export class InvoiceCardComponent {
  @Input() invoice!: Invoice;
  @Input() index!: number;
  @Output() invoiceSelected = new EventEmitter<Invoice>();
  @Output() invoiceChanged = new EventEmitter<Invoice>();

  onInvoiceSelected(invoice: Invoice) {
    this.invoiceSelected.emit(invoice);
  }

  onInvoiceChanged(invoice: Invoice) {
    this.invoiceChanged.emit(invoice);
  }
}
