import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
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
}
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.getJwtToken();
    if (token && token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`
        }
      });
    }

    return next.handle(request).pipe( tap(() => {},

      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        let token = this.authService.getJwtToken();
        if (err.status !== 401) {
          console.log("401----")
            return;

        }else{
          this.authService.login().subscribe(response => {
            this.authService.saveJwtRefresh(response.refresh);
            this.authService.saveJwtToken(response.access);
            console.log('401 -ben login:', response);
            token = this.authService.getJwtToken();
            console.log("401 -ben get token:"+token)
            request = request.clone({
              setHeaders: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${token}`
              }
            });
          }, error => {
            console.error('Hiba történt:', error);
            });


        }
      }
    }));
  }
}
