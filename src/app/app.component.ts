import { INVOICES } from './../../db-data-invoice';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceComponent } from "./invoice/invoice.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InvoiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  coreInvoice = INVOICES[1];

}
