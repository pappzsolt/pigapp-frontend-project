import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostSummary } from '../../model/invoice_sum_cost.model';
import { ApiConfigService } from './api-config.service';

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
}
