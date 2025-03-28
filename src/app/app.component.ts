import { INVOICES } from './../../db-data-invoice';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceComponent } from "./invoice/invoice.component";
import { Invoice } from '../model/invoice';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoiceComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  invoices = INVOICES;


  onInvoiceSelected(invoice:Invoice){
    console.log("App component click",invoice)
  }
}
