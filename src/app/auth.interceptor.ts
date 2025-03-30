import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';

import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
    console.warn('%c[AuthInterceptor] :AuthInterceptor', 'color: red;');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Új fejléc hozzáadása a kéréshez
    const clonedRequest = req.clone({
      setHeaders: {
        // Például egy Authorization header:
        Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`
      }
    });

    console.log('%c[Interceptor] Modified Request:', 'color: blue;', clonedRequest);

    // Visszaküldjük a módosított kérést
    return next.handle(clonedRequest);
  }
}

