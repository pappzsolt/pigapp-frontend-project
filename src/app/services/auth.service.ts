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
        // console.log("tokne valasz:"+response.access)
        if (response && response.access) {
          localStorage.setItem('jwt_token', response.access);
        }
      })
    );
  }

  ok(): void {
    this.login().subscribe(
      (response) => {
        this.saveToken(response.access);
      },
      (error) => {
        console.log('Hibás felhasználónév vagy jelszó!');
      }
    );
  }
  saveToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  // Token lekérése a localStorage-ból
  getToken(): string | null {
    console.log("mivan?"+localStorage.getItem('jwt_token'))
    return localStorage.getItem('jwt_token');
  }

}

