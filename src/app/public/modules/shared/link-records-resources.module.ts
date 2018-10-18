import {
  NgModule
} from '@angular/core';

import {
  SKY_LIB_RESOURCES_PROVIDERS
} from '@skyux/i18n';

import {
  SkyLinkRecordsResourcesProvider
} from '../../plugin-resources/link-records-resources-provider';

@NgModule({
  providers: [{
    provide: SKY_LIB_RESOURCES_PROVIDERS,
    useClass: SkyLinkRecordsResourcesProvider,
    multi: true
  }]
})
export class SkyLinkRecordsResourcesModule { }
