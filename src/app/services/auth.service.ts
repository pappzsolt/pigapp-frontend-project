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

  decodedTokenObj: any;


  constructor(private http: HttpClient) {}

  login(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      this.http.post<any>(this.apiUrl, this.jsonData)
            .subscribe({
              next: (response) => {
                observer.next(response);
                if (response && response.access  ) {
                  sessionStorage.setItem('jwt_token', response.access);
                  sessionStorage.setItem('jwt_refresh', response.refresh);
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

  decodeToken() {
    const token = this.getToken()
      if (token) {
          this.decodedTokenObj = this.getJwtDecode(token);
          return this.decodedTokenObj;
          //console.log("decode token:"+this.decodedToken.exp)
      }
      else{
        return null;
      }
    }

  getExpireDate() {
    const expireDate = this.decodedTokenObj.exp;
    if (expireDate) {
      const expirationDate = new Date(expireDate * 1000);
      return expirationDate
    } else {
      console.error('Az exp mező nem található.');
      return null
    }
  }

  checkExpireDate(){
    this.decodeToken()
    const expireDate = this.getExpireDate()
    console.log('Lejárati dátum111:', expireDate);
  }

/*   isTokenExpired(): boolean {

    const expiryTime: number = this.getExpireDate() ?? 0;
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  } */


  saveToken(token: string): void {
    sessionStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('jwt_token');
  }

  getRefresh(): string | null {
    return sessionStorage.getItem('jwt_refresh');
  }

  getJwtDecode(token: string): any {
      return jwtDecode(token);
  }
}



