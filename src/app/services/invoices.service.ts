import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Invoice } from '../../model/invoice';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  invoices$: Observable<Invoice[]> = of([]); // Kezdő érték, üres tömb

  private http = inject(HttpClient);

  private invoiceUrl = environment.invoiceUrl;

  private invoiceSaveUrl = environment.invoiceSaveUrl;

  constructor() {}

  // Invoice lista lekérése
  getInvoiceList(): Observable<Invoice[]> {
    return new Observable<Invoice[]>(observer => {
      this.http.get<Invoice[]>(this.invoiceUrl).subscribe({
        next: response => {
          observer.next(response); // Az adatok továbbítása a feliratkozott komponensnek
        },
        error: err => {
          console.error('Hiba:', err);
          observer.error(err); // Hiba esetén kiadjuk az error-t
        },
        complete: () => {
          observer.complete(); // Az Observable befejeződött
        },
      });
    });
  }

  saveInvoice(invoice: Invoice) {
    return this.http.put(this.invoiceSaveUrl + invoice.id, invoice);
  }
}
