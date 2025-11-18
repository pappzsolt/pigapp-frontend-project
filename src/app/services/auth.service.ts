import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { ApiEndpoints } from '../core/api-endpoints';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(ApiEndpoints.auth.token, credentials);
  }

  refreshToken(refresh: string): Observable<any> {
    return this.http.post<any>(ApiEndpoints.auth.refresh, { refresh });
  }

  saveJwtToken(token: string): void {
    sessionStorage.setItem('jwt_token', token);
    this.loggedIn.next(true); // frissítjük a státuszt
  }

  saveJwtRefresh(token: string): void {
    sessionStorage.setItem('jwt_refresh', token);
  }

  getJwtToken(): string | null {
    return sessionStorage.getItem('jwt_token');
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem('jwt_refresh');
  }

  logout(): void {
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('jwt_refresh');
    this.loggedIn.next(false); // frissítjük a státuszt
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // ha akarod, itt ellenőrizheted a lejáratot is:
    // return !!this.getJwtToken() && !this.isTokenExpired();
    return !!this.getJwtToken();
  }

  isTokenExpired(): boolean {
    const expirationDate = this.getTokenExpirationDate();
    if (!expirationDate) return true;
    return expirationDate.getTime() < Date.now();
  }

  getTokenExpirationDate(): Date | null {
    const token = this.getJwtToken();
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

  getUserId(): number {
    const token = this.getJwtToken();
    if (!token) return 0;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.user_id || 0;
    } catch (error) {
      console.error('Hibás token:', error);
      return 0;
    }
  }
}
