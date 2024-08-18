import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {registerLocaleData} from '@angular/common'
import localeFR from '@angular/common/locales/fr'

registerLocaleData(localeFR)

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
