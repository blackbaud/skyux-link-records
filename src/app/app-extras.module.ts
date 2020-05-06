import {
  NgModule
} from '@angular/core';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyLinkRecordsModule
} from './public/public_api';

@NgModule({
  exports: [
    SkyAppLinkModule,
    SkyLinkRecordsModule
  ]
})
export class AppExtrasModule { }
