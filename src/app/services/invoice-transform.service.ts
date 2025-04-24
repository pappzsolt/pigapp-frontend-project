import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceResponse, InvoiceTransferResponse } from '../../model/invoice';
import { environment } from '../../environments/environment.prod';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceTransformService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  getInvoiceOptions(): Observable<InvoiceResponse> {
    return this.http.get<InvoiceResponse>(this.apiConfig.apiEnvironment.apiInvoiceComboUrl);
  }
  transferAmount(szamla1: number, szamla2: number, amount: number) {
    return this.http.patch<InvoiceTransferResponse>(
      `${this.apiConfig.apiEnvironment.apiInvoiceUpdateUrl}${szamla1}/${szamla2}`,
      { amount }
    );
  }
}
