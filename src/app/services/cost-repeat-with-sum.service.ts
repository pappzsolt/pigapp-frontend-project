import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostRepeatWithSum } from '../../model/cost-repeat-with-sum.model';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class CostRepeatWithSumService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  getCostRepeats(): Observable<CostRepeatWithSum[]> {
    return this.http.get<CostRepeatWithSum[]>(this.apiConfig.apiEnvironment.apiCostRepeatWithSum);
  }
}
