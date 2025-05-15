import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from '../invoice/invoice.component';
import { Observable } from 'rxjs';
import { Invoice } from '../../model/invoice';
import { GroupByPipe } from '../shared/group-by.pipe';

@Component({
  selector: 'app-invoice-list-panel',
  standalone: true,
  imports: [CommonModule, InvoiceComponent, GroupByPipe],
  templateUrl: './invoice-list-panel.component.html',
})
export class InvoiceListPanelComponent {
  @Input() invoices$!: Observable<Invoice[]>; // Az eredeti Observable

  @Output() invoiceSelected = new EventEmitter<Invoice>();
  @Output() invoiceChanged = new EventEmitter<Invoice>();
}


