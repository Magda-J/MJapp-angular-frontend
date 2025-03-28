import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { httpTokenInterceptorInterceptor } from './http-token-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withXsrfConfiguration({ cookieName: 'XSFR-TOKEN', headerName: 'Xsrf-Headers' }),
      withInterceptors([httpTokenInterceptorInterceptor])
    )
  ]
};
