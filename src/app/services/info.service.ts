import { inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Invoice } from '../../model/invoice';
import { map } from 'rxjs/operators';
import { InvoiceIdWithName, InvoiceSumCost } from '../../model/invoice_sum_cost.model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private http = inject(HttpClient);
  // invoiceIdWithName$: Observable<InvoiceIdWithName[]> = of([]);

  /* itt majd le kell kérni az invoiceid at es mondegyikre meghívni az url -t az eredmény egy tömbe jönne */

  private invoiceSumCostListAllUrl = "http://192.168.1.37:8000/api/pigapp_app/all_invoice_sum_cost_list/all";
  private invoiceSumCostInvoicePaidTrueUrl = "http://192.168.1.37:8000/api/pigapp_app/invoice_sum_cost_list/2/true";
  private invoiceSumCostInvoicePaidFalseUrl = "http://192.168.1.37:8000/api/pigapp_app/invoice_sum_cost_list/2/false";

  private invoiceOnlyIdsUrl = "http://192.168.1.37:8000/api/pigapp_app/invoice_only_ids/";

  constructor() { }


  getInvoiceIdWithNameAll(): Observable<InvoiceIdWithName[]> {
    return new Observable<InvoiceIdWithName[]>((observer) => {
          this.http.get<InvoiceIdWithName[]>(this.invoiceOnlyIdsUrl)
            .subscribe({
              next: (response) => {
                observer.next(response);
              },
              error: (err) => {
                console.error('Hiba:', err);
                observer.error(err);
              },
              complete: () => {
                observer.complete();
              }
            });
        },
    )};

  getFirstInvoiceSumCostAll(): Observable<InvoiceSumCost> {
    return this.http.get<InvoiceSumCost[]>(this.invoiceSumCostListAllUrl).pipe(
      map(data => data[0]) // csak az első elem
    );
  }
}
