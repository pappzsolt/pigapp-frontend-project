import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getJwtToken();
    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError(error => {
        // 🔁 Központosított HTTP hiba loggolás
        if (error instanceof HttpErrorResponse) {
          this.logHttpError(error, request);
        }

        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }

        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refresh = this.authService.getRefreshToken();
      if (!refresh) {
        // központosított log erre az esetre is
        console.error('[AUTH] Nincs refresh token, nem lehet frissíteni.');
        return throwError(() => new Error('Nincs refresh token'));
      }

      return this.authService.refreshToken(refresh).pipe(
        switchMap((tokenResponse: any) => {
          this.isRefreshing = false;
          this.authService.saveJwtToken(tokenResponse.access);
          this.refreshTokenSubject.next(tokenResponse.access);

          return next.handle(this.addToken(request, tokenResponse.access));
        }),
        catchError(err => {
          // frissítés hibájának loggolása is központosítva
          if (err instanceof HttpErrorResponse) {
            this.logHttpError(err, request, 'Token frissítés sikertelen');
          } else {
            console.error('[AUTH] Token frissítésnél nem HTTP hiba:', err);
          }

          this.isRefreshing = false;
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap((token: string | null) =>
          next.handle(this.addToken(request, token!))
        )
      );
    }
  }

  /**
   * Központi helyen formázott HTTP hiba loggolás
   */
  private logHttpError(
    error: HttpErrorResponse,
    request: HttpRequest<any>,
    context?: string
  ): void {
    const baseMessage = context ? `[HTTP ERROR] ${context}` : '[HTTP ERROR]';

    console.error(baseMessage, {
      url: request.url,
      method: request.method,
      status: error.status,
      statusText: error.statusText,
      message: error.message,
      error: error.error,
    });
  }
}
