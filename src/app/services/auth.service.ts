import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private tokenUrl = "http://192.168.1.37:8000/api/token/";
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private currentToken: string | null = null;
  jsonData = {
    "email": "papp.zsolt.gabor@gmail.com",
    "password": "2EdrufrU"
  };

  constructor(private http: HttpClient) {
    this.currentToken = sessionStorage.getItem('authToken');
    if (this.currentToken) {
      this.tokenSubject.next(this.currentToken);
    }
  }

  login(): Observable<any> {
    return this.http.post<any>(this.tokenUrl, this.jsonData).pipe(
      map((response) => {
        this.currentToken = response.access;
        if (this.currentToken !== null) {
          sessionStorage.setItem('authToken', this.currentToken);
        }
        this.tokenSubject.next(this.currentToken);
        return response;
      }),
      catchError((error) => {
        console.error('Login error', error);
        throw error;
      })
    );

  }


getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

}
