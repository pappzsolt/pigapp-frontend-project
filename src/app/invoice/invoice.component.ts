import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { INVOICES } from './../../../db-data-invoice';
import { Invoice } from '../../model/invoice';
import { HighlightedDirective } from "./../directives/highlighted.directive";

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [HighlightedDirective],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit{

  @Input({
    required: true
  })
  invoice!: Invoice;

  @Input()
  invoiceIndex!: number;

  @Output()
  invoiceSelected = new EventEmitter<Invoice>();

  constructor(){}


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onInvoiceView(){
    // console.log("invoice click");
    this.invoiceSelected.emit(this.invoice);
  }

}
