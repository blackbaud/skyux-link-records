import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyCheckboxModule
} from '@skyux/forms';

import {
  SkyI18nModule
} from '@skyux/i18n';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyLinkRecordsResourcesModule
} from '../shared/link-records-resources.module';

import {
  SkyLinkRecordsComponent
} from './link-records.component';

import {
  SkyLinkRecordsItemComponent
} from './link-records-item.component';

import {
  SkyLinkRecordsItemContentComponent
} from './link-records-item-content.component';

import {
  SkyLinkRecordsItemDiffComponent
} from './link-records-item-diff.component';

import {
  SkyLinkRecordsItemTitleComponent
} from './link-records-item-title.component';

import {
  SkyLinkRecordsMatchContentComponent
} from './link-records-match-content.component';

import {
  SkyLinkRecordsNoMatchContentComponent
} from './link-records-nomatch-content.component';

import {
  SkyLinkRecordsRendererComponent
} from './link-records-renderer.component';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    SkyLinkRecordsComponent,
    SkyLinkRecordsItemComponent,
    SkyLinkRecordsItemDiffComponent,
    SkyLinkRecordsItemTitleComponent,
    SkyLinkRecordsItemContentComponent,
    SkyLinkRecordsMatchContentComponent,
    SkyLinkRecordsNoMatchContentComponent,
    SkyLinkRecordsRendererComponent
  ],
  imports: [
    CommonModule,
    SkyCheckboxModule,
    SkyI18nModule,
    SkyIconModule,
    SkyLinkRecordsResourcesModule
  ],
  exports: [
    SkyLinkRecordsComponent,
    SkyLinkRecordsItemComponent,
    SkyLinkRecordsItemDiffComponent,
    SkyLinkRecordsItemTitleComponent,
    SkyLinkRecordsItemContentComponent,
    SkyLinkRecordsMatchContentComponent,
    SkyLinkRecordsNoMatchContentComponent,
    SkyLinkRecordsRendererComponent
  ]
})
export class SkyLinkRecordsModule {
}
