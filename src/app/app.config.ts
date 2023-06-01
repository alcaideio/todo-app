import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';

import { QuicklinkStrategy } from 'ngx-quicklink';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  // withPreloading(PreloadAllModules)
  providers: [provideRouter(routes, withPreloading(QuicklinkStrategy)), provideHttpClient()]
};
