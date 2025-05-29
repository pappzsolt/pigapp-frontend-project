import {
  Invoice,
  InvoiceSummary,
  InvoiceWithCostDetail,
  TotalAmountInvoice,
} from '../../model/invoice';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MonthlyCalculationService } from '../services/monthly-calculation.service';
import { UpcomingCost } from '../../model/cost';
import { InvoiceDetailViewerComponent } from '../monthly-calculation/invoice-detail-viewer/invoice-detail-viewer.component';
import { InvoiceSummaryViewerComponent } from './invoice-summary-viewer/invoice-summary-viewer.component';
import { TailwindStyledSelectDirective } from '../shared/directives/tailwind-styled-select.directive';
@Component({
  selector: 'app-monthly-calculation',
  standalone: true,
  imports: [
    CommonModule,
    InvoiceDetailViewerComponent,
    InvoiceSummaryViewerComponent,
    TailwindStyledSelectDirective,
  ],
  templateUrl: './monthly-calculation.component.html',
  styleUrl: './monthly-calculation.component.css',
})
export class MonthlyCalculationComponent implements OnInit {
  totalAmountInvoice?: TotalAmountInvoice;
  invoices: Invoice[] = [];
  invoiceSummaries: InvoiceSummary[] = [];
  invoiceWithCosts: InvoiceWithCostDetail[] = [];
  isLoading = false;
  errorMessage = '';
  currentPage = 1;
  costCurrentPage: { [invoiceId: number]: number } = {};
  pageSize = 5;
  Math = Math;
  invoicesCombo: any[] = [];
  selectedInvoiceId: number | null = null;
  upcomingCosts: UpcomingCost[] = [];

  constructor(private monthlyCalculationService: MonthlyCalculationService) {}

  ngOnInit(): void {
    this.loadForeignKeyData();
    if (this.invoicesCombo.length === 0) {
      this.invoicesCombo.push({ id: 0, invoice_name: 'Nincs kiválasztott számla' });
    }
    this.selectedInvoiceId ? this.loadData(this.selectedInvoiceId) : this.loadData(1);

    this.monthlyCalculationService.getUpcomingCosts().subscribe({
      next: data => (this.upcomingCosts = data),
      error: err => console.error(err),
    });
  }

  handleInvoiceChange(invoiceId: number): void {
    this.selectedInvoiceId = invoiceId;
    this.loadData(invoiceId);
  }

  handleNextCostPage(data: { invoiceId: number; costs: any[] }): void {
    const { invoiceId, costs } = data;
    const totalPages = Math.ceil(costs.length / this.pageSize);
    const currentPage = this.costCurrentPage[invoiceId] || 1;
    if (currentPage < totalPages) {
      this.costCurrentPage[invoiceId] = currentPage + 1;
    }
  }

  handlePrevCostPage(invoiceId: number): void {
    const currentPage = this.costCurrentPage[invoiceId] || 1;
    if (currentPage > 1) {
      this.costCurrentPage[invoiceId] = currentPage - 1;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.invoiceWithCosts.length) this.currentPage++;
  }

  loadForeignKeyData(): void {
    this.monthlyCalculationService.getForeignKeyData().subscribe({
      next: data => (this.invoicesCombo = data.invoices),
      error: error => console.error('Hiba a ForeignKey adatok betöltésekor:', error),
    });
  }

  loadData(invoiceId: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.monthlyCalculationService.getTotalAmountInvoice().subscribe({
      next: data => (this.totalAmountInvoice = data),
      error: err => this.handleError(err),
    });

    this.monthlyCalculationService.getInvoices().subscribe({
      next: data => (this.invoices = data),
      error: err => this.handleError(err),
    });

    this.monthlyCalculationService.getInvoicesCostSummary().subscribe({
      next: data => (this.invoiceSummaries = data),
      error: err => this.handleError(err),
    });

    this.monthlyCalculationService.getInvoiceWithCostDetail(invoiceId).subscribe({
      next: data => {
        this.invoiceWithCosts = Array.isArray(data) ? data : [data];
      },
      error: err => this.handleError(err),
      complete: () => (this.isLoading = false),
    });
  }

  private handleError(error: any): void {
    console.error(error);
    this.errorMessage = 'Hiba történt az adatok betöltésekor.';
    this.isLoading = false;
  }
}
