import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';  // Az AuthService-t az implementációdtól függően kell implementálni

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>,
          next: HttpHandler): Observable<HttpEvent<any>> {
          const token = this.authService.getJwtToken();
          // const refresh = this.authService.getJwtRefresh();
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





