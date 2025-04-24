import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostSummary } from '../../model/invoice_sum_cost.model';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class InfoService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiInfoUrl;

  constructor() {}

  getMonthlySummary(): Observable<CostSummary[]> {
    return this.http.get<CostSummary[]>(this.apiUrl);
  }
}
