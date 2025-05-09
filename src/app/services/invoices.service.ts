import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Invoice } from '../../model/invoice';
import { ApiConfigService } from './api-config.service';
@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  invoices$: Observable<Invoice[]> = of([]); // Kezdő érték, üres tömb

  private http = inject(HttpClient);

  constructor(private apiConfig: ApiConfigService) {}

  // Invoice lista lekérése
  getInvoiceList(): Observable<Invoice[]> {
    return new Observable<Invoice[]>(observer => {
      this.http.get<Invoice[]>(this.apiConfig.apiEnvironment.invoiceUrl).subscribe({
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
    console.log("InvoicesService")
    return this.http.put(this.apiConfig.apiEnvironment.invoiceSaveUrl + invoice.id, invoice);
  }
}
