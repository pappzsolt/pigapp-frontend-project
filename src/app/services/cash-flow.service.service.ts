import { inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cashflow } from '../../model/cashflow';

@Injectable({
  providedIn: 'root'
})
export class CashFlowServiceService {

  cashflows$: Observable<Cashflow[]> = of([]); // Kezdő érték, üres tömb
  private token: string = '';
  private http = inject(HttpClient);

  private today = new Date();
  private year = this.today.getFullYear();
  private month = String(this.today.getMonth() + 1).padStart(2, '0'); // hónap: 0-indexelt
  private day = "01";

  private formattedDate = `${this.year}-${this.month}-${this.day}`;

  private originalDate = `${this.year}-${this.month}-${this.day}`;



  private cashFlowUrlAll = "http://192.168.1.37:8000/api/pigapp_app/list_cash_flow/";

  // private cashFlowActual = "http://192.168.1.37:8000/api/pigapp_app/list_cash_flow_filter_date/"+this.formattedDate;
  private cashFlowActual = "http://192.168.1.37:8000/api/pigapp_app/list_cash_flow_last/";

  constructor() {
  }

  getCashFlowListAll(): Observable<Cashflow[]> {
    return new Observable<Cashflow[]>((observer) => {
          this.http.get<Cashflow[]>(this.cashFlowUrlAll)
            .subscribe({
              next: (response) => {
                observer.next(response);  // Az adatok továbbítása a feliratkozott komponensnek
              },
              error: (err) => {
                console.error('Hiba:', err);
                observer.error(err);  // Hiba esetén kiadjuk az error-t
              },
              complete: () => {
                observer.complete();  // Az Observable befejeződött
              }
            });
        },
    )};
    getCashFlowListActual(): Observable<Cashflow[]> {
      return new Observable<Cashflow[]>((observer) => {
            this.http.get<Cashflow[]>(this.cashFlowActual)
              .subscribe({
                next: (response) => {
                  observer.next(response);  // Az adatok továbbítása a feliratkozott komponensnek
                },
                error: (err) => {
                  console.error('Hiba:', err);
                  observer.error(err);  // Hiba esetén kiadjuk az error-t
                },
                complete: () => {
                  observer.complete();  // Az Observable befejeződött
                }
              });
          },
      )};

}
