import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceOption, InvoiceResponse, InvoiceTransferResponse } from '../../model/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceTransformService {

  private apiInvoiceComboUrl = 'http://192.168.1.37:8000/api/pigapp_app/api/invoices/combo/';

  private apiInvoiceUpdateUrl = 'http://192.168.1.37:8000/api/pigapp_app/invoice/transfer/';

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
