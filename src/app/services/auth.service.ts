import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, take, tap } from 'rxjs/operators';
interface Token {
  access: string;
  refresh: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private tokenUrl = "http://192.168.1.37:8000/api/token/";
  private tokenSubject = new BehaviorSubject<{ access: string; refresh: string } | null>(null);
  private tokenInProgress$: Observable<Token> | null = null; // Folyamatban lévő token kérés
  jsonData = {
    "email": "papp.zsolt.gabor@gmail.com",
    "password": "2EdrufrU"
  };

  constructor(private http: HttpClient) {
    const savedToken = sessionStorage.getItem('access_token');
    if (savedToken) {
      try {
        const parsedToken: Token = JSON.parse(savedToken);
        this.tokenSubject.next(parsedToken);
        console.log('%c[AuthService] Token loaded from sessionStorage:', 'color: green;', parsedToken);
      } catch (error) {
        console.error('%c[AuthService] Failed to parse token:', 'color: red;', error);
      }
    }
  }


  fetchAccessToken(): Observable<Token> {
    this.tokenInProgress$ = this.http.post<Token>(this.tokenUrl, this.jsonData).pipe(
      tap((token) => {
        console.log('[AuthService] Token received:', token);
        this.tokenSubject.next(token); // Token frissítése
        sessionStorage.setItem('access_token', JSON.stringify(token)); // Token mentése
      }),
      catchError((error) => {
        console.error('[AuthService] Token fetch error:', error);
        return of({ access: '', refresh: '' } as Token); // Hiba esetén üres token
      }),
    );

    return this.tokenInProgress$;
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable().pipe(

      switchMap((token: Token | null) => {

        if (token) {
          console.log("token.access"+token.access)
          return of(token.access); // Ha van token, adjuk vissza
        }

        // Ha nincs token, indítsuk el az új kérést
        return this.fetchAccessToken().pipe(
          map((newToken) => {
            return newToken ? newToken.access : null; // Visszaadjuk az access tokent
          })
        );
      })
    );
  }
}
