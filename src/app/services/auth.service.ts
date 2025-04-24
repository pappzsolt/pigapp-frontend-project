import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ApiConfigService } from './api-config.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  jsonData = {
    email: 'papp.zsolt.gabor@gmail.com',
    password: '2EdrufrU',
  };

  constructor(private http: HttpClient,private apiConfig: ApiConfigService) {}

  login(): Observable<any> {
    return this.http.post<any>(this.apiConfig.apiEnvironment.apiTokenUrl, this.jsonData);
  }

  isTokenExpired(): boolean {
    const expirationDate = this.getTokenExpirationDate();
    console.log('expirationDate:' + expirationDate);
    if (!expirationDate) return true; // Ha nincs token vagy nincs exp mező, akkor tekintsük lejártnak

    return expirationDate.getTime() < Date.now(); // Ha a dátum a jelenlegi idő előtt van, akkor lejárt
  }

  saveJwtToken(token: string): void {
    sessionStorage.removeItem('jwt_token');
    sessionStorage.setItem('jwt_token', token);
  }
  saveJwtRefresh(token: string): void {
    sessionStorage.removeItem('jwt_refresh');
    sessionStorage.setItem('jwt_refresh', token);
  }

  getJwtToken(): string | null {
    return sessionStorage.getItem('jwt_token');
  }

  getJwtRefresh(): string | null {
    return sessionStorage.getItem('jwt_refresh');
  }

  getJwtDecode(token: string): any {
    return jwtDecode(token);
  }
  getUserId(): number | number {
    const token = sessionStorage.getItem('jwt_token');
    if (!token) return 0;

    try {
      const decodedToken: any = jwtDecode(token);
      if (!decodedToken.user_id) return 0;

      return decodedToken.user_id;
    } catch (error) {
      console.error('Hibás token:', error);
      return 0;
    }
  }

  getTokenExpirationDate(): Date | null {
    const token = sessionStorage.getItem('jwt_token');
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
}
