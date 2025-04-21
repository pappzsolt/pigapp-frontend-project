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
import { ReactiveFormsModule } from '@angular/forms';

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

  constructor(
    private invoicesService: InvoicesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig
  ) {}

  ngOnInit() {
    this.invoices$ = this.invoicesService.getInvoiceList();
  }

  onInvoiceSelected(invoice: Invoice) {
    console.log('App component click', invoice);
  }

  onInvoiceSave(invoice: Invoice) {
    this.invoicesService.saveInvoice(invoice).subscribe(() => console.log('invoice save'));
  }
}
