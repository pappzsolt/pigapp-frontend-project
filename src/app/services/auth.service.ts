import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
    return this.http
      .post<any>(this.apiUrl, this.jsonData)
      .pipe(
        tap((response) => {
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
    const token = localStorage.getItem('jwt_token');
    // Ha van token, egy Observable-t adunk vissza
    return of(token);  // Ha null, akkor is egy Observable<any>-t adunk vissza
  }



  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

}

