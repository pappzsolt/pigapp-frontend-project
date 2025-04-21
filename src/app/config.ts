import { InjectionToken } from '@angular/core';

export interface AppConfig {
  invoiceApiUrl: string;
}

export const APP_CONFIG: AppConfig = {
  invoiceApiUrl: 'http',
};

export const CONFIG_TOKEN = new InjectionToken<AppConfig>('CONFIG_TOKEN', {
  providedIn: 'root',
  factory: () => APP_CONFIG,
});
