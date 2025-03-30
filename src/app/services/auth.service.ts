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

  login(): Observable<any> {
    return this.http.post<any>(this.apiUrl, this.jsonData).pipe(
      tap((response) => {

        if (response && response.access  ) {
          localStorage.setItem('jwt_token', response.access);
          localStorage.setItem('jwt_refresh', response.refresh);
        }
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }
  
  getRefresh(): string | null {
    return localStorage.getItem('jwt_refresh');
  }
}

