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

  constructor(private http: HttpClient) {

  }

  login(): Observable<any> {
    return this.http.post<any>(this.apiUrl, this.jsonData).pipe(
      tap((response) => {
        // Ha van token a válaszban, akkor elmentjük a localStorage-ba
        if (response && response.token) {
          localStorage.setItem('jwt_token', response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  getToken(): Observable<any> {
    return this.login().pipe(
      switchMap(() => {
        const token = localStorage.getItem('jwt_token');
        console.log("Token: " + token);
        return of(token); // Visszaadjuk az Observable-t
      })
    );
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

}

