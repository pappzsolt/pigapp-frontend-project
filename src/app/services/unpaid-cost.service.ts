import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PaginatedUnpaidCostResponse, UnpaidCost } from '../../model/unpaid-cost.interface';
import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class UnpaidCostService {
  constructor(private http: HttpClient) {}

  /**
   * Lekéri az összes nem fizetett költséget, hozzáadva a `selected` mezőt
   */
  getUnpaidCosts(): Observable<PaginatedUnpaidCostResponse & { results: (UnpaidCost & { selected: boolean })[] }> {
    return this.http.get<PaginatedUnpaidCostResponse>(ApiEndpoints.costs.costCheck).pipe(
      map(data => ({
        ...data,
        results: data.results.map(cost => ({ ...cost, selected: false }))
      }))
    );
  }

  /**
   * Lapozásnál URL alapján lekéri a következő/adott oldalt, hozzáadva a `selected` mezőt
   */
  getUnpaidCostsByUrl(url: string): Observable<PaginatedUnpaidCostResponse & { results: (UnpaidCost & { selected: boolean })[] }> {
    return this.http.get<PaginatedUnpaidCostResponse>(url).pipe(
      map(data => ({
        ...data,
        results: data.results.map(cost => ({ ...cost, selected: false }))
      }))
    );
  }
}
