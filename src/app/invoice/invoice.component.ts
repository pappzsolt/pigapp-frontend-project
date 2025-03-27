import { Component, OnInit, Input } from '@angular/core';
import { INVOICES } from './../../../db-data-invoice';
import { Invoice } from '../../model/invoice';
@Component({
  selector: 'app-invoice',
  imports: [],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit{

  @Input()
  invoice!: Invoice;

  constructor(){}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
