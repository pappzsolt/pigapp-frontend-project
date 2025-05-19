import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceWithCostDetail } from '../../../model/invoice';

@Component({
  selector: 'app-invoice-detail-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-detail-viewer.component.html',
})
export class InvoiceDetailViewerComponent {
  @Input() isLoading = false;
  @Input() errorMessage = '';
  @Input() invoicesCombo: any[] = [];
  @Input() invoiceWithCosts: InvoiceWithCostDetail[] = [];
  @Input() costCurrentPage: { [invoiceId: number]: number } = {};
  @Input() pageSize = 5;

  @Output() invoiceChange = new EventEmitter<number>();
  @Output() nextPage = new EventEmitter<{ invoiceId: number; costs: any[] }>();
  @Output() prevPage = new EventEmitter<number>();

  Math = Math;
  selectedInvoiceId: number | null = null;

  onInvoiceChange(invoiceId: string | number): void {
    const id = Number(invoiceId);
    if (!isNaN(id)) {
      this.selectedInvoiceId = id;
      this.invoiceChange.emit(id);
    }
  }

  getPaginatedCosts(invoiceId: number, costs: any[]): any[] {
    const currentPage = this.costCurrentPage[invoiceId] || 1;
    const start = (currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return costs.slice(start, end);
  }
}
