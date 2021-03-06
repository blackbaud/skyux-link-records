import { Injectable } from '@angular/core';
import { StateDispatcher, StateOrchestrator } from '@skyux/list-builder-common';
import { SkyLinkRecordsStateAction } from './link-records-state-action.type';

@Injectable()
export class SkyLinkRecordsStateDispatcher extends StateDispatcher<SkyLinkRecordsStateAction> {
}

export class SkyLinkRecordsStateOrchestrator<T>
  extends StateOrchestrator<T, SkyLinkRecordsStateAction> {
}
