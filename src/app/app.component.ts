import { Component, Inject, inject, InjectionToken, OnInit, ViewChild } from '@angular/core';
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
import { GroupByThreePipe } from './pipe/group-by-three.pipe';
import { GroupByPipe } from './pipe/group-by.pipe';


function invoicesServiceProvider(): InvoicesService{
  return new InvoicesService();
}
export const INVOICES_SERVICE = new InjectionToken<InvoicesService>('INVOICES_SERVICE')

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoiceComponent,CashFlowComponent,CommonModule,GroupByThreePipe,GroupByPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    {
      provide: INVOICES_SERVICE,
      useFactory: invoicesServiceProvider,
      deps: []
    }
  ]
})



export class AppComponent implements OnInit{

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  invoices$: Observable<Invoice[]> = of([]);
  cashflows$: Observable<Cashflow[]> = of([]);
  // groupedInvoices: any[][] = [];


  // private invoicesService = inject(InvoicesService);
  private cashFlowService = inject(CashFlowServiceService);

  constructor(@Inject(INVOICES_SERVICE) private invoicesService: InvoicesService){

  }

  ngOnInit(){
    this.invoices$ = this.invoicesService.getInvoiceList();
    this.cashflows$ = this.cashFlowService.getCashFlowList();

    /* this.invoices$.subscribe(invoices => {
      this.groupedInvoices = [];
      for (let i = 0; i < invoices.length; i += 3) {
        this.groupedInvoices.push(invoices.slice(i, i + 3));
      }
    }); */
  }

  onInvoiceSelected(invoice:Invoice){
    console.log("App component click",invoice);
  }

  onInvoiceSave(invoice:Invoice){
    this.invoicesService.saveInvoice(invoice).subscribe(
      () => console.log("invoice save")
    );
  }
}




