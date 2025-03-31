import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceComponent } from "./invoice/invoice.component";
import { CommonModule } from '@angular/common';
import { InvoicesService } from './services/invoices.service';
import { from, Observable, of } from 'rxjs';
import { Invoice } from '../model/invoice';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoiceComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent implements OnInit{

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  invoices$: Observable<Invoice[]> = of([]);

  private invoicesService = inject(InvoicesService);

  constructor(){
    this.authService.login().subscribe()
    this.authService.checkExpireDate()
  }

  ngOnInit(){
    //this.authService.login().subscribe();

    this.invoices$ = this.invoicesService.getInvoiceList();
  }

  onInvoiceSelected(invoice:Invoice){
    console.log("App component click",invoice);
  }

}




