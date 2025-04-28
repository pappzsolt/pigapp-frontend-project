import { Invoice, InvoiceSummary, InvoiceWithCostDetail, TotalAmountInvoice } from '../../model/invoice';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MonthlyCalculationService } from '../services/monthly-calculation.service';

@Component({
  selector: 'app-monthly-calculation',
  standalone: true,
  imports: [CommonModule],
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

  constructor(private monthlyCalculationService: MonthlyCalculationService) {}
  ngOnInit(): void {
    this.loadData();
  }

  getPaginatedCosts(invoiceId: number, costs: any[]): any[] {
    const currentPage = this.costCurrentPage[invoiceId] || 1;
    const start = (currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return costs.slice(start, end);
  }

  nextCostPage(invoiceId: number, costs: any[]): void {
    const totalPages = Math.ceil(costs.length / this.pageSize);
    const currentPage = this.costCurrentPage[invoiceId] || 1;
    if (currentPage < totalPages) {
      this.costCurrentPage[invoiceId] = currentPage + 1;
    }
  }

  prevCostPage(invoiceId: number): void {
    const currentPage = this.costCurrentPage[invoiceId] || 1;
    if (currentPage > 1) {
      this.costCurrentPage[invoiceId] = currentPage - 1;
    }
  }

  // A fő lapozás (számlák között)
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.invoiceWithCosts.length) {
      this.currentPage++;
    }
  }

  loadData(): void {
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
      complete: () => (this.isLoading = false),
    });

    this.monthlyCalculationService.getInvoiceWithCostDetail().subscribe({
      next: data => {
        if (Array.isArray(data)) {
          this.invoiceWithCosts = data;
        } else {
          this.invoiceWithCosts = [data];
        }
        console.log(this.invoiceWithCosts);
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
