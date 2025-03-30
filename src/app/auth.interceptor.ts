import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';  // Az AuthService-t az implementációdtól függően kell implementálni

@Injectable()
/* export class AuthInterceptor implements HttpInterceptor {

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
      return next.handle(clonedRequest);
    }

    // Továbbküldjük a módosított kérés
    return next.handle(request);
  }
} */

  export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Token lekérése az AuthService-ből
      this.authService.ok()
      const token = this.authService.getToken();

      // Ha van token, hozzáadjuk a kéréshez, és csak a 'Authorization' headerhez
      if (token) {
        // A kérés másolása a meglévő fejléc módosításával
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });

        // A módosított kérést továbbítjuk
        return next.handle(clonedRequest);
      }

      // Ha nincs token, továbbítjuk az eredeti kérést
      return next.handle(req);
    }
  }



