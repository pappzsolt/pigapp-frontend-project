import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
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

  login(): Observable<any> {
    return this.http.post<any>(this.apiUrl, this.jsonData).pipe(
      tap((response) => {
        if (response && response.access) {
          this.saveJwtToken(response.access);
          this.saveJwtRefresh(response.refresh);
        }
      }),
      catchError((error) => {
        console.error('Hiba:', error);
        return throwError(() => error);
      })
    );
  }

  login____(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      this.http.post<any>(this.apiUrl, this.jsonData)
            .subscribe({
              next: (response) => {
                observer.next(response);
                if (response && response.access  ) {
                  this.saveJwtToken(response.access);
                  this.saveJwtRefresh(response.refresh);
                }
              },
              error: (err) => {
                console.error('Hiba:', err);
                observer.error(err);
              },
              complete: () => {
                observer.complete();
              }
            });
        },
    )};

  isTokenExpired(): boolean {
    const expirationDate = this.getTokenExpirationDate();
    console.log("expirationDate:"+expirationDate)
    if (!expirationDate) return true; // Ha nincs token vagy nincs exp mező, akkor tekintsük lejártnak

    return expirationDate.getTime() < Date.now(); // Ha a dátum a jelenlegi idő előtt van, akkor lejárt
  }


  saveJwtToken(token: string): void {
    sessionStorage.removeItem('jwt_token');
    sessionStorage.setItem('jwt_token', token);
  }
  saveJwtRefresh(token: string): void {
    sessionStorage.removeItem('jwt_refresh');
    sessionStorage.setItem('jwt_refresh', token);
  }
/*   getJwtToken(): string | null {
    if(this.isTokenExpired()){
      console.log("ha lejart:"+this.isTokenExpired()+" regi token:"+sessionStorage.getItem('jwt_token'))
      this.login().subscribe();
      console.log("login utan:"+this.isTokenExpired()+" uj_token:"+sessionStorage.getItem('jwt_token'))
      return sessionStorage.getItem('jwt_token');
    }
    else{
      return sessionStorage.getItem('jwt_token');
    }
  } */

  getJwtToken(): string | null {
    return sessionStorage.getItem('jwt_token');
  }

  getJwtRefresh(): string | null {
    return sessionStorage.getItem('jwt_refresh');
  }

  getJwtDecode(token: string): any {
      return jwtDecode(token);
  }

  getTokenExpirationDate(): Date | null {
    const token =  sessionStorage.getItem('jwt_token');
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      if (!decodedToken.exp) return null;

      return new Date(decodedToken.exp * 1000);
    } catch (error) {
      console.error('Hibás token:', error);
      return null;
    }
  }
}



