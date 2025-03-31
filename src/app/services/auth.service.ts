import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = "http://192.168.1.37:8000/api/token/";


  jsonData = {
    "email": "papp.zsolt.gabor@gmail.com",
    "password": "2EdrufrU"
  };

  constructor(private http: HttpClient) {}

/*    login(): Observable<any> {
    return this.http.post<any>(this.apiUrl, this.jsonData).pipe(
      tap((response) => {

        if (response && response.access  ) {
          sessionStorage.setItem('jwt_token', response.access);
          sessionStorage.setItem('jwt_refresh', response.refresh);
        }
      })
    );
  } */

  login(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      this.http.post<any>(this.apiUrl, this.jsonData)
            .subscribe({
              next: (response) => {
                observer.next(response);  // Az adatok továbbítása a feliratkozott komponensnek
                if (response && response.access  ) {
                  sessionStorage.setItem('jwt_token', response.access);
                  sessionStorage.setItem('jwt_refresh', response.refresh);
                }
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



  saveToken(token: string): void {
    sessionStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('jwt_token');
  }

  getRefresh(): string | null {
    return sessionStorage.getItem('jwt_refresh');
  }
}

