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

  jsonData = {
    "email": "papp.zsolt.gabor@gmail.com",
    "password": "2EdrufrU"
  };

  constructor(private http: HttpClient) {}

  login(): Observable<any> {
    return this.http.post<any>(this.tokenUrl, this.jsonData)

  }

  saveDataToSessionStorage() {
    this.login().subscribe(
      (token) => {
        sessionStorage.setItem('authToken', token);
      }
    )
  }
  

}
