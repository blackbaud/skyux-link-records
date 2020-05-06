import { SkyLinkRecordsStateOrchestrator } from '../link-records-state.rxstate';
<<<<<<< HEAD
import { AsyncList } from '@skyux/list-builder-common';
import * as moment_ from 'moment';
const moment = moment_;
=======
import { AsyncList } from 'microedge-rxstate/dist';
>>>>>>> master

import { SkyLinkRecordsResultModel } from './result.model';
import { SkyLinkRecordsResultsLoadAction } from './actions';

export class SkyLinkRecordsResultsOrchestrator
  extends SkyLinkRecordsStateOrchestrator<AsyncList<SkyLinkRecordsResultModel>> {
  constructor() {
    super();

    this
      .register(SkyLinkRecordsResultsLoadAction, this.load);
  }

  private load(
    state: AsyncList<SkyLinkRecordsResultModel>,
    action: SkyLinkRecordsResultsLoadAction): AsyncList<SkyLinkRecordsResultModel> {
    const newResults = action.results.filter(c => c).map(g => new SkyLinkRecordsResultModel(g));

    if (action.refresh) {
      return new AsyncList<SkyLinkRecordsResultModel>(newResults, new Date());
    }

    return new AsyncList<SkyLinkRecordsResultModel>([...state.items, ...newResults], new Date());
  }
}
