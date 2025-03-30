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

  constructor(private http: HttpClient) {
    // Ha van elmentett token sessionStorage-ban, akkor beállítjuk a tokenSubject-et
    const savedToken = sessionStorage.getItem('access_token');
    if (savedToken) {
      this.tokenSubject.next(savedToken);
    }
  }

  // Token lekérése a backendtől
  fetchAccessToken(): Observable<string> {
    return this.http.post<{ access: string }>(this.tokenUrl, this.jsonData).pipe(
      map(response => response.access),
      tap(token => {
        console.log('%c[AuthService] Token received and stored in sessionStorage:', 'color: green;', token);
        this.tokenSubject.next(token); // Frissítjük a memóriát
        sessionStorage.setItem('access_token', token); // Mentjük el a sessionStorage-ba
      }),
      catchError(error => {
        console.error('%c[AuthService] Token fetch error:', 'color: red;', error);
        return throwError(() => new Error('Token fetch failed!'));
      })
    );
  }

  // Ha van elmentett token a memóriában vagy sessionStorage-ban, azt használjuk
  getAccessToken(): Observable<string | null> {
    // Ha már van token a memóriában, azonnal visszaadjuk
    const currentToken = this.tokenSubject.getValue();
    if (currentToken) {
      return of(currentToken);
    }

    // Ha nincs, próbáljuk meg betölteni a sessionStorage-ból
    const savedToken = sessionStorage.getItem('access_token');
    if (savedToken) {
      this.tokenSubject.next(savedToken); // Frissítjük a memóriát
      return of(savedToken);
    }

    // Ha nincs semmi, akkor kérünk egy újat a backendtől
    return this.fetchAccessToken();
  }
}
