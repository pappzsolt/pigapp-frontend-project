import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CostSummary } from '../../model/invoice_sum_cost.model';
import { ApiConfigService } from './api-config.service';
import { UpcomingCost } from '../../model/cost';
@Injectable({
  providedIn: 'root',
})
export class SidebarMenuService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  getMonthlySummary(): Observable<CostSummary[]> {
    return this.http.get<CostSummary[]>(this.apiConfig.apiEnvironment.apiInfoUrl);
  }

  getUpcomingCosts(): Observable<UpcomingCost[]> {
    return this.http
      .get<UpcomingCost[]>(this.apiConfig.apiEnvironment.apiUpComingUnpaidCostsUrl)
      .pipe(
        catchError(error => {
          console.error('Hiba a közelgő költségek lekérésekor:', error);
          return throwError(() => new Error('Nem sikerült betölteni az adatokat.'));
        })
      );
  }
}
