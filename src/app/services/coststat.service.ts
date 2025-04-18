import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CostGroupData {
  costgroup_name: string;
  total_amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CostStatService {

  private apiUrl = 'http://192.168.1.37:8000/api/pigapp_app/costgroup-cost/'; // Cseréld le a saját API URL-re!

  constructor(private http: HttpClient) { }

  getCostGroupData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

