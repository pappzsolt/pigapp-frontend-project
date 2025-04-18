import { inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Invoice } from '../../model/invoice';
import { map } from 'rxjs/operators';
import { CostSummary, InvoiceIdWithName, InvoiceSumCost } from '../../model/invoice_sum_cost.model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private http = inject(HttpClient);

  private apiUrl = 'http://192.168.1.37:8000/api/pigapp_app/api/cost-summary/';

  constructor() { }

  getMonthlySummary(): Observable<CostSummary[]> {
    return this.http.get<CostSummary[]>(this.apiUrl);
  }
}
