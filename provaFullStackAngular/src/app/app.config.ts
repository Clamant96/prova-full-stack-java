import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { FormControl, FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      HttpClient,
      FormsModule,
      FormControl
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()), // withHashLocation() -> Configuração de roteamento com HashLocationStrategy (melhoria a forma de roteamento deixando o angular mapear as interações realizadas)
    provideClientHydration(),
    provideHttpClient(withFetch()) // CONFIGURA O HTTP CLIENT PARA REALIZAR REQUISIÇÕES, CASO NAO PASSE O FETCH, ELE UTILIZACA O XHR QUE É PADRAO DO ANGULAR
  ]
};
