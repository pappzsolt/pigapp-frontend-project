import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { INVOICES } from './../../../db-data-invoice';
import { Invoice } from '../../model/invoice';
@Component({
  selector: 'app-invoice',
  imports: [],
  standalone: true,
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
