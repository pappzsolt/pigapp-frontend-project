import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostGroupResponse } from '../../model/invoice_sum_cost.model';
import { KeyValue } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class CostStatService {

  private apiUrl = 'http://192.168.1.37:8000/api/pigapp_app/costgroup-cost/'; // Cseréld le a saját API URL-re!

  constructor(private http: HttpClient) { }

  getCostGroupData(): Observable<CostGroupResponse> {
    return this.http.get<CostGroupResponse>(this.apiUrl);
  }

}

