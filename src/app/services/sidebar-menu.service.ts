import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CostSummary } from '../../model/invoice_sum_cost.model';
import { UpcomingCost } from '../../model/cost';
import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class SidebarMenuService {
  constructor(private http: HttpClient) {}

  getMonthlySummary(): Observable<CostSummary[]> {
    return this.http.get<CostSummary[]>(ApiEndpoints.costs.summary);
  }

  getUpcomingCosts(): Observable<UpcomingCost[]> {
    return this.http
      .get<UpcomingCost[]>(ApiEndpoints.costs.upcomingUnpaid)
      .pipe(
        catchError(error => {
          console.error('Hiba a közelgő költségek lekérésekor:', error);
          return throwError(() => new Error('Nem sikerült betölteni az adatokat.'));
        })
      );
  }
}
