import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
/* export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>,
          next: HttpHandler): Observable<HttpEvent<any>> {
          const token = this.authService.getJwtToken();

          if (token) {
              const cloned = req.clone({
                  headers: req.headers.set("Authorization",
                      "Bearer " + token)
              });

              return next.handle(cloned);
          }
          else {
              return next.handle(req);
          }
        }
}
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getJwtToken();
    console.log(this.authService.isTokenExpired());
    if (token && token) {
      this.authService.getTokenExpirationDate();
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          console.log('401-es hiba - új token kérése');
          return this.authService
            .login({ email: 'papp.zsolt.gabor@gmail.com', password: '2EdrufrU' })
            .pipe(
              switchMap(response => {
                // Tokenek mentése
                this.authService.saveJwtRefresh(response.refresh);
                this.authService.saveJwtToken(response.access);
                console.log('Új token megszerezve:', response.access);

                // Új token lekérése
                const newToken = this.authService.getJwtToken();

                // Új request létrehozása az új tokennel
                const newRequest = request.clone({
                  setHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${newToken}`,
                  },
                });

                // Ismételt küldés az új tokennel
                return next.handle(newRequest);
              }),
              catchError(error => {
                console.error('Hiba új token kérés közben:', error);
                return throwError(error);
              })
            );
        }
        return throwError(err);
      })
    );
  }
}
