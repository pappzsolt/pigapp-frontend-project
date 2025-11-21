import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cashflow, CashFlowResponse } from '../../model/cashflow';
import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class CashFlowServiceService {
  cashflows$: Observable<Cashflow[]> = of([]); // Kezdő érték, üres tömb
  private token: string = '';
  private http = inject(HttpClient);

  constructor() {}

  getForeignKeyData(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.costs.foreignKeyData);
  }

  getCashFlowListAll(): Observable<Cashflow[]> {
    // Az extra Observable wrapper felesleges, a HttpClient már Observable-t ad vissza
    return this.http.get<Cashflow[]>(ApiEndpoints.cashFlow.all);
  }

  getCashFlowLast(): Observable<Cashflow> {
    return this.http.get<Cashflow>(ApiEndpoints.cashFlow.actual);
  }

  getById(id: number): Observable<CashFlowResponse> {
    return this.http.get<CashFlowResponse>(`${ApiEndpoints.cashFlow.getById}${id}/`);
  }

  create(cashFlow: CashFlowResponse): Observable<CashFlowResponse> {
    return this.http.post<CashFlowResponse>(ApiEndpoints.cashFlow.create, cashFlow);
  }

  update(id: number, cashFlow: CashFlowResponse): Observable<CashFlowResponse> {
    return this.http.put<CashFlowResponse>(`${ApiEndpoints.cashFlow.getById}${id}/`, cashFlow);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${ApiEndpoints.cashFlow.getById}${id}/`);
  }
}
