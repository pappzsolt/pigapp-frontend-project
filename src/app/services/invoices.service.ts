import { inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Invoice } from '../../model/invoice';
@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  invoices$: Observable<Invoice[]> = of([]); // Kezdő érték, üres tömb
  private token: string = '';
  private http = inject(HttpClient);
  private tokenUrl = "http://192.168.1.37:8000/api/token/";
  private invoiceUrl = "http://192.168.1.37:8000/api/pigapp_app/only_invoice_list/";

  jsonData = {
    "email": "papp.zsolt.gabor@gmail.com ",
    "password": "2EdrufrU"
  };

  
  constructor() {}

  getAccessToken(): Observable<any> {
    return this.http.post<any>(this.tokenUrl, this.jsonData);
  }

  // Beállítja a token-t
  setAccessToken(token: string): void {
    this.token = token;
  }

  // Visszaadja a token-t
  getToken(): string {
    return this.token;
  }

  // Token használata és invoice lista lekérése
  useAccessToken(): Observable<void> {
    return new Observable<void>((observer) => {
      this.getAccessToken().subscribe({
        next: (response) => {
          this.setAccessToken(response.access); // Token beállítása
          observer.next(); // Visszajelzés, hogy sikerült
          observer.complete();
        },
        error: (err) => {
          console.error('Hiba a token megszerzésében:', err);
          observer.error(err); // Hiba esetén kiadjuk az error-t
        }
      });
    });
  }

  // Invoice lista lekérése
  getInvoiceList(): Observable<Invoice[]> {
    return new Observable<Invoice[]>((observer) => {
      this.useAccessToken().subscribe({
        next: () => {
          if (!this.token) {
            console.log('A token nem lett beállítva!');
            observer.next([]);  // Ha nincs token, üres tömböt adunk vissza
            observer.complete();
            return;
          }

          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getToken()
          });

          this.http.get<Invoice[]>(this.invoiceUrl, { headers })
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
        error: (err) => {
          observer.error(err); // Ha a token nem jön össze, hiba
        }
      });
    });
  }
}
