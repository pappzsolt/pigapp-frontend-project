import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';  // Az AuthService-t az implementációdtól függően kell implementálni

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Lekérjük a JWT tokent a szolgáltatásból
    this.authService.ok()
    const token = this.authService.getToken();

    // Ha van token, hozzáadjuk a fejléchez
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Továbbküldjük a módosított kérés
    return next.handle(request);
  }
}





