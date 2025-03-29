import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceComponent } from "./invoice/invoice.component";
import { CommonModule } from '@angular/common';
import { InvoicesService } from './services/invoices.service';
import { from, Observable, of } from 'rxjs';
import { Invoice } from '../model/invoice';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoiceComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent implements OnInit{


  invoices$: Observable<Invoice[]> = of([]);

  private invoicesService = inject(InvoicesService);

  constructor(){}

  ngOnInit(){
    this. invoices$ = this.invoicesService.getInvoiceList();

  }

  onInvoiceSelected(invoice:Invoice){
    console.log("App component click",invoice);
  }

}




