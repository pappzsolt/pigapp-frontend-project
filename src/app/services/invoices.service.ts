import { inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Invoice, InvoiceOption } from '../../model/invoice';
@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  invoices$: Observable<Invoice[]> = of([]); // Kezdő érték, üres tömb

  private http = inject(HttpClient);

  private invoiceUrl = "http://192.168.1.37:8000/api/pigapp_app/only_invoice_list/";

  private invoiceSaveUrl = "http://192.168.1.37:8000/api/pigapp_app/only_invoice_detail/";


  constructor() {}


  // Invoice lista lekérése
  getInvoiceList(): Observable<Invoice[]> {
    return new Observable<Invoice[]>((observer) => {
          this.http.get<Invoice[]>(this.invoiceUrl)
            .subscribe({
              next: (response) => {
                observer.next(response);  // Az adatok továbbítása a feliratkozott komponensnek
              },
              error: (err) => {
                console.error('Hiba:', err);
                observer.error(err);  // Hiba esetén kiadjuk az error-t
              },
              complete: () => {
                observer.complete();  // Az Observable befejeződött
              }
            });
        },
    )};

  saveInvoice(invoice:Invoice){
    return this.http.put(this.invoiceSaveUrl+invoice.id,invoice);
  }
}

