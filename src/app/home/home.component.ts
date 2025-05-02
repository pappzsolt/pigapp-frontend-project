import { Invoice, InvoiceOption } from '../../model/invoice';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GroupByThreePipe } from '../pipe/group-by-three.pipe';
import { GroupByPipe } from '../pipe/group-by.pipe';
import { AppConfig, CONFIG_TOKEN } from '../config';
import { InvoiceComponent } from '../invoice/invoice.component';
import { InvoicesService } from '../services/invoices.service';
import { InvoiceCostSummaryService } from '../services/invoice-cost-summary.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceCostSummary } from '../../model/invoice-cost-summary.model';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    InvoiceComponent,
    CommonModule,
    GroupByThreePipe,
    GroupByPipe,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  invoices$: Observable<Invoice[]> = of([]);
  invoiceOption: InvoiceOption[] = [];
  summaries: InvoiceCostSummary[] = [];
  startOfMonth: Date;
  endOfMonth: Date;

  constructor(
    private invoicesService: InvoicesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    private invoiceCostSummaryService: InvoiceCostSummaryService
  ) {
    const today = new Date();
    this.startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  }

  ngOnInit() {
    this.invoices$ = this.invoicesService.getInvoiceList();
    this.getInvoiceCostSummaryService();
  }

  onInvoiceSelected(invoice: Invoice) {
    console.log('App component click', invoice);
  }

  onInvoiceSave(invoice: Invoice) {
    this.invoicesService.saveInvoice(invoice).subscribe(() => console.log('invoice save'));
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
