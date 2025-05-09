import { Input, EventEmitter, Output } from '@angular/core';
import { Invoice } from '../../model/invoice';
import { HighlightedDirective } from '../directives/highlighted.directive';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GroupByThreePipe } from '../pipe/group-by-three.pipe';
import { GroupByPipe } from '../pipe/group-by.pipe';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [HighlightedDirective, CommonModule, GroupByThreePipe, GroupByPipe,FormsModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
})
export class InvoiceComponent implements OnInit {
  @Input({
    required: true,
  })
  invoice!: Invoice;

  @Input()
  invoiceIndex!: number;

  @Output()
  invoiceSelected = new EventEmitter<Invoice>();

  @Output('invoiceChanged')
  invoiceEmitter = new EventEmitter<Invoice>();

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onInvoiceView() {
    // console.log("invoice click");
    this.invoiceSelected.emit(this.invoice);
  }

  onSaveClicked() {
    this.invoiceEmitter.emit({ ...this.invoice });
  }



}
