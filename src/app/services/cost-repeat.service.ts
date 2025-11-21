// src/app/services/cost-repeat.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostRepeat } from '../../model/costrepeat';

import { ApiEndpoints } from '../core/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class CostRepeatService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CostRepeat[]> {
    return this.http.get<CostRepeat[]>(ApiEndpoints.costRepeat.create);
  }

  create(data: CostRepeat): Observable<CostRepeat> {
    return this.http.post<CostRepeat>(ApiEndpoints.costRepeat.create, data);
  }

  getCostRepeats(): Observable<CostRepeat[]> {
    return this.http.get<CostRepeat[]>(ApiEndpoints.costRepeat.listAll);
  }
}
