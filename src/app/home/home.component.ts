import {  Input, EventEmitter, Output } from '@angular/core';
import { INVOICES } from './../../../db-data-invoice';
import { Invoice } from '../../model/invoice';
import { HighlightedDirective } from "./../directives/highlighted.directive";
import { CommonModule } from '@angular/common';
import { Component, Inject, inject, InjectionToken, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { GroupByThreePipe } from '../pipe/group-by-three.pipe';
import { GroupByPipe } from '../pipe/group-by.pipe';
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from '../config';
import { InvoiceComponent } from '../invoice/invoice.component';
import { InvoicesService } from '../services/invoices.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, InvoiceComponent,CommonModule,GroupByThreePipe,GroupByPipe],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  invoices$: Observable<Invoice[]> = of([]);


  constructor(private invoicesService: InvoicesService, @Inject(CONFIG_TOKEN) private config: AppConfig){
    console.log(config)
  }


  ngOnInit(){
    this.invoices$ = this.invoicesService.getInvoiceList();


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



