import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostRepeatWithSum } from '../../model/cost-repeat-with-sum.model';

import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class CostRepeatWithSumService {
  constructor(private http: HttpClient) {}

  getCostRepeats(): Observable<CostRepeatWithSum[]> {
    return this.http.get<CostRepeatWithSum[]>(ApiEndpoints.costs.repeatWithSum5);
  }
}
