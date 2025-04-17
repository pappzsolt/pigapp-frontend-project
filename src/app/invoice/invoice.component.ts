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
import { CashFlowServiceService } from '../services/cash-flow.service.service';
import { Cashflow } from './../../model/cashflow';
import { CashFlowComponent } from "../cash-flow/cash-flow.component";
import { GroupByThreePipe } from '../pipe/group-by-three.pipe';
import { GroupByPipe } from '../pipe/group-by.pipe';
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from '../config';
@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [HighlightedDirective,CommonModule,GroupByThreePipe,GroupByPipe],
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

  @Output('invoiceChanged')
  invoiceEmitter = new EventEmitter<Invoice>();

  constructor(){}


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onInvoiceView(){
    // console.log("invoice click");
    this.invoiceSelected.emit(this.invoice);
  }

  onSaveClicked(invoice_note:string){
    this.invoiceEmitter.emit({...this.invoice,invoice_note});
  }
}
