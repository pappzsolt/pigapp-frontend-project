import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Invoice } from '../../model/invoice';

import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  invoices$: Observable<Invoice[]> = of([]); // Kezdő érték, üres tömb

  private http = inject(HttpClient);

  constructor() {}

  // Invoice lista lekérése
  getInvoiceList(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(ApiEndpoints.invoices.onlyInvoiceList);
  }

  saveInvoice(invoice: Invoice): Observable<any> {
    console.log('InvoicesService');
    return this.http.put(`${ApiEndpoints.invoices.saveInvoiceDetail}${invoice.id}`, invoice);
  }
}
