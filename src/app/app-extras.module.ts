import {
  NgModule
} from '@angular/core';

import {
  SkyLinkRecordsModule
} from './public';

@NgModule({
  imports: [
    SkyLinkRecordsModule
  ],
  exports: [
    SkyLinkRecordsModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
