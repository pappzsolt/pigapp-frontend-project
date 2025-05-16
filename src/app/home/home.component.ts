import { Invoice } from '../../model/invoice';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GroupByThreePipe } from '../pipe/group-by-three.pipe';
import { GroupByPipe } from '../pipe/group-by.pipe';
import { AppConfig, CONFIG_TOKEN } from '../config';
import { InvoicesService } from '../services/invoices.service';
import { InvoiceCostSummaryService } from '../services/invoice-cost-summary.service';
import { InvoiceCostSummary } from '../../model/invoice-cost-summary.model';
import { InvoiceCardComponent } from '../invoice/invoice-card/invoice-card.component';
import { InvoiceSummaryCardComponent } from '../invoice/invoice-summary-card/invoice-summary-card.component';
@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    CommonModule,
    GroupByThreePipe,
    GroupByPipe,
    InvoiceCardComponent,
    InvoiceSummaryCardComponent,
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  invoices$: Observable<Invoice[]> = of([]);

  summaries: InvoiceCostSummary[] = [];

  get startOfMonth(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }

  get endOfMonth(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 0);
  }

  constructor(
    private invoicesService: InvoicesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    private invoiceCostSummaryService: InvoiceCostSummaryService
  ) {}

  ngOnInit() {
    this.invoices$ = this.invoicesService.getInvoiceList();
    this.getInvoiceCostSummaryService();
  }

  onInvoiceSelected(invoice: Invoice) {
    console.log('App component click', invoice);
  }

  /*   onInvoiceSave(invoice: Invoice) {
    this.invoicesService.saveInvoice(invoice).subscribe(() => console.log('invoice save'));
  } */
  onInvoiceSave(invoice: Invoice): void {
    const invoiceToSave: Invoice = {
      ...invoice,
      enable_invoice: invoice.enable_invoice ? 1 : 0,
    };

    this.invoicesService.saveInvoice(invoiceToSave).subscribe({
      next: () => console.log('Számla mentve.'),
      error: err => console.error('Mentési hiba:', err),
    });
  }
  trackBySummary(index: number, summary: InvoiceCostSummary): number {
    return summary.invoice_id; // vagy egyedi azonosító
  }

  getInvoiceCostSummaryService() {
    this.invoiceCostSummaryService.getInvoiceCostSummary().subscribe({
      next: data => {
        this.summaries = data;
      },
      error: err => {
        console.error('Hiba a lekérdezés során:', err);
      },
    });
  }
}
