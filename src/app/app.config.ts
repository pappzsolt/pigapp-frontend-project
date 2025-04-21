import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

console.warn('%c[appConfig] :ApplicationConfig', 'color: red;');

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // Interceptorok regisztrálása a DI-ből
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // AuthInterceptor regisztrálása
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
  ],
};
