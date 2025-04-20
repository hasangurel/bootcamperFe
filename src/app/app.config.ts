import {ApplicationConfig, InjectionToken} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpInterceptor,
  provideHttpClient,
  withInterceptors, withInterceptorsFromDi
} from "@angular/common/http";
import {CustomInterceptor} from "./interceptor/custom-interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
     provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true,
    },
    provideHttpClient(), provideAnimationsAsync()
  ]
};
