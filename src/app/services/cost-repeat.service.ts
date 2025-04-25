// src/app/services/cost-repeat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostRepeat } from '../../model/costrepeat';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root',
})
export class CostRepeatService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  getAll(): Observable<CostRepeat[]> {
    return this.http.get<CostRepeat[]>(this.apiConfig.apiEnvironment.apiCostRepeatCreateUrl);
  }

  create(data: CostRepeat): Observable<CostRepeat> {
    return this.http.post<CostRepeat>(this.apiConfig.apiEnvironment.apiCostRepeatCreateUrl, data);
  }
  getCostRepeats(): Observable<CostRepeat[]> {
    return this.http.get<CostRepeat[]>(this.apiConfig.apiEnvironment.apiCostRepeatGetAllUrl);
  }
}
