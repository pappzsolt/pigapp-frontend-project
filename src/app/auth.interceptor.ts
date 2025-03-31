import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';  // Az AuthService-t az implementációdtól függően kell implementálni

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
} */
        @Injectable()
        export class AuthInterceptor implements HttpInterceptor {

          constructor(private authService: AuthService) {}

          intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const token1 = this.authService.getJwtToken();
            let authReq = req;
            if (token1) {
              authReq = this.addToken(req, token1);
            }
            return next.handle(authReq).pipe(
              catchError((error: HttpErrorResponse) => {
                const token2 = this.authService.getJwtToken();
                if (error.status === 401 && token2) {
                  return next.handle(this.addToken(req, token2));
                }
                return throwError(() => error);
              })
            );
          }

          private addToken(req: HttpRequest<any>, token: string) {
            return req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
          }
        }
