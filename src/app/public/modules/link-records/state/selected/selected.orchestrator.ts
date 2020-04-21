import { SkyLinkRecordsStateOrchestrator } from '../link-records-state.rxstate';
import { AsyncItem } from '@skyux/list-builder-common';
import * as moment_ from 'moment';
const moment = moment_;

import {
  SkyLinkRecordsSelectedSetSelectedAction,
  SkyLinkRecordsSelectedClearSelectedAction
} from './actions';

export class SkyLinkRecordsSelectedOrchestrator
  extends SkyLinkRecordsStateOrchestrator<AsyncItem<{[key: string]:
    {[keyField: string]: boolean}}>> {
  constructor() {
    super();

    this
      .register(SkyLinkRecordsSelectedSetSelectedAction, this.setSelected)
      .register(SkyLinkRecordsSelectedClearSelectedAction, this.clearSelected);
  }

  private setSelected(
    state: AsyncItem<{[key: string]: {[keyField: string]: boolean}}>,
    action: SkyLinkRecordsSelectedSetSelectedAction):
      AsyncItem<{[key: string]: {[keyField: string]: boolean}}> {
      let newStateItem = Object.assign({}, state.item);
      let fields = (newStateItem[action.key]) ? Object.assign({}, newStateItem[action.key]) : {};
      fields[action.fieldKey] = action.selected;
      newStateItem[action.key] = fields;

      return new AsyncItem<{[key: string]: {[keyField: string]: boolean}}>(
        newStateItem, moment(), state.loading);
  }

  private clearSelected(
    state: AsyncItem<{[key: string]: {[keyField: string]: boolean}}>,
    action: SkyLinkRecordsSelectedSetSelectedAction):
      AsyncItem<{[key: string]: {[keyField: string]: boolean}}> {
      let newStateItem = Object.assign({}, state.item);
      newStateItem[action.key] = undefined;

      return new AsyncItem<{[key: string]: {[keyField: string]: boolean}}>(
        newStateItem, moment(), state.loading);
  }
}
