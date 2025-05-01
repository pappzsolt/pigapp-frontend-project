import {
  Invoice,
  InvoiceSummary,
  InvoiceWithCostDetail,
  TotalAmountInvoice,
} from '../../model/invoice';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MonthlyCalculationService } from '../services/monthly-calculation.service';
import { ForeignKeyData } from '../../model/foreignkeydata';
import { UpcomingCost } from '../../model/cost';

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
  invoicesCombo: any[] = [];
  selectedInvoiceId: number | null = null;
  upcomingCosts: UpcomingCost[] = [];

  constructor(private monthlyCalculationService: MonthlyCalculationService) {}

  ngOnInit(): void {
    this.loadForeignKeyData();
    // Alapértelmezett kiválasztott számla, ha nincs adat
    if (this.invoicesCombo.length === 0) {
      this.invoicesCombo.push({ id: 0, invoice_name: 'Nincs kiválasztott számla' });
    }
    // Ha nincs kiválasztott számla, akkor alapértelmezett ID-t használunk
    if (this.selectedInvoiceId) {
      this.loadData(this.selectedInvoiceId);
    } else {
      this.loadData(1);
    }
    this.monthlyCalculationService.getUpcomingCosts().subscribe({
      next: (data) => (this.upcomingCosts = data),
      error: (err) => console.error(err),
    });
  }

  onInvoiceChange(event: any): void {
    const invoiceId = Number(event.target.value); // Konvertáljuk a kiválasztott értéket számra

    // Ha érvényes számot kaptunk, frissítsük az ID-t és töltsük le az adatokat
    if (!isNaN(invoiceId)) {
      this.selectedInvoiceId = invoiceId;
      this.loadData(this.selectedInvoiceId); // Meghívjuk a loadData-t az új invoiceId-val
    }
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
  loadForeignKeyData(): void {
    this.monthlyCalculationService.getForeignKeyData().subscribe(
      data => {
        this.invoicesCombo = data.invoices;
      },
      error => {
        console.error('Hiba a ForeignKey adatok betöltésekor:', error);
      }
    );
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
      complete: () => (this.isLoading = false),
    });

    this.monthlyCalculationService.getInvoiceWithCostDetail(invoiceId).subscribe({
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
