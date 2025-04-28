import { Input, EventEmitter, Output } from '@angular/core';
import { Invoice, InvoiceSummary, InvoiceWithCost, TotalAmountInvoice } from '../../model/invoice';
import { HighlightedDirective } from './../directives/highlighted.directive';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GroupByThreePipe } from '../pipe/group-by-three.pipe';
import { GroupByPipe } from '../pipe/group-by.pipe';
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
  invoiceWithCosts: InvoiceWithCost[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private monthlyCalculationService: MonthlyCalculationService) {}
  ngOnInit(): void {
    this.loadData();
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
      next: data => (this.invoiceWithCosts = data),
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
