import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

bootstrapApplication(
  AppComponent,
  { providers: [ provideExperimentalZonelessChangeDetection() ] }
)
.catch( error => console.error(error));
