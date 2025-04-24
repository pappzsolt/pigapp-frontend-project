import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceResponse, InvoiceTransferResponse } from '../../model/invoice';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class InvoiceTransformService {
  private apiInvoiceComboUrl = environment.apiInvoiceComboUrl;

  private apiInvoiceUpdateUrl = environment.apiInvoiceUpdateUrl;

  constructor(private http: HttpClient) {}

  getInvoiceOptions(): Observable<InvoiceResponse> {
    return this.http.get<InvoiceResponse>(this.apiInvoiceComboUrl);
  }
  transferAmount(szamla1: number, szamla2: number, amount: number) {
    return this.http.patch<InvoiceTransferResponse>(
      `${this.apiInvoiceUpdateUrl}${szamla1}/${szamla2}`,
      { amount }
    );
  }
}
