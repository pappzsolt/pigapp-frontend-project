import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceComponent } from "./invoice/invoice.component";
import { CommonModule } from '@angular/common';
import { InvoicesService } from './services/invoices.service';
import { from, Observable, of } from 'rxjs';
import { Invoice } from '../model/invoice';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { CashFlowServiceService } from './services/cash-flow.service.service';
import { Cashflow } from '../model/cashflow';
import { CashFlowComponent } from "./cash-flow/cash-flow.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoiceComponent,CashFlowComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent implements OnInit{

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  invoices$: Observable<Invoice[]> = of([]);
  cashflows$: Observable<Cashflow[]> = of([]);

  private invoicesService = inject(InvoicesService);
  private cashFlowService = inject(CashFlowServiceService);

  constructor(){}

  ngOnInit(){
    this.invoices$ = this.invoicesService.getInvoiceList();
    this.cashflows$ = this.cashFlowService.getCashFlowList();
  }

  onInvoiceSelected(invoice:Invoice){
    console.log("App component click",invoice);
  }

}




