import {
  async,
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  map as observableMap,
  take
} from 'rxjs/operators';

import {
  Observable,
  of as observableOf
} from 'rxjs';

import {
  SkyLinkRecordsFieldsSetFieldsAction
} from './state/fields/actions';

import {
  SkyLinkRecordsFieldModel
} from './state/fields/field.model';

import {
  SkyLinkRecordsMatchesLoadAction
} from './state/matches/actions';

import {
  SkyLinkRecordsMatchModel
} from './state/matches/match.model';

import {
  SkyLinkRecordsResultsLoadAction
} from './state/results/actions';

import {
  SkyLinkRecordsResultModel
} from './state/results/result.model';

import {
  SkyLinkRecordsSelectedSetSelectedAction
} from './state/selected/actions';

import {
  SkyLinkRecordsStateDispatcher
} from './state/link-records-state.rxstate';

import {
  SkyLinkRecordsState
} from './state/link-records-state.state-node';

import {
  SkyLinkRecordsStateModel
} from './state/link-records-state.model';

import {
  SkyLinkRecordsComponent
} from './link-records.component';

import {
  SkyLinkRecordsItemModel
} from './link-records-item.model';

import {
  SkyLinkRecordsModule
} from './link-records.module';

import {
  SKY_LINK_RECORDS_STATUSES
} from './link-records-statuses';

describe('Component: SkyLinkRecordsComponent', () => {
  let fixture: any,
    component: any,
    dispatcher: SkyLinkRecordsStateDispatcher,
    state: SkyLinkRecordsState;

  beforeEach(async(() => {
    dispatcher = new SkyLinkRecordsStateDispatcher();
    state = new SkyLinkRecordsState(new SkyLinkRecordsStateModel(), dispatcher);

    TestBed.configureTestingModule({
      imports: [
        SkyLinkRecordsModule
      ],
      providers: [
        { provide: SkyLinkRecordsState, useValue: state },
        { provide: SkyLinkRecordsStateDispatcher, useValue: dispatcher }
      ]
    });

    fixture = TestBed.createComponent(SkyLinkRecordsComponent);
    component = fixture.componentInstance;
    state = component.state as SkyLinkRecordsState;
    dispatcher = component.dispatcher as SkyLinkRecordsStateDispatcher;
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('items are converted to observable on ngOnInit', () => {
    component.items = [{ id: '1' }];

    fixture.detectChanges();
    expect(component.items instanceof Observable).toBe(true);
  });

  it('matches are converted to observable on ngOnInit', () => {
    component.matches = [{ id: '1' }];

    fixture.detectChanges();
    expect(component.matches instanceof Observable).toBe(true);
  });

  it('matchFields are converted to observable on ngOnInit', () => {
    component.matchFields = [{ key: 'name' }];

    fixture.detectChanges();
    expect(component.matches instanceof Observable).toBe(true);
  });

  it('unlinked matches loaded into state and result item is undefined on ngOnInit', async(() => {
    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Created,
      item: { id: '11' }
    });
    component.matches = observableOf([linkRecordMatch]);

    fixture.detectChanges();

    state.pipe(
      observableMap(s => s.matches.items),
      take(1)
    )
      .subscribe(m => {
        let match = m[0];
        expect(match.key).toEqual(linkRecordMatch.key);
        expect(match.status).toEqual(linkRecordMatch.status);
        expect(match.item).toEqual(linkRecordMatch.item);
      });

    state.pipe(
      observableMap(s => s.results.items),
      take(1)
    )
      .subscribe(r => {
        let result = r[0];
        expect(result.key).toEqual(linkRecordMatch.key);
        expect(result.status).toEqual(linkRecordMatch.status);
        expect(result.item).toBeUndefined();
      });
  }));

  it('error is thrown if fields key does equal keyIdSelector on ngOnInit', () => {
    expect(() => {
        component.keyIdSelector = 'foo';
        const matchFields = [
          {
            key: 'foo'
          }
        ];
        component['validateMatchFields'](matchFields);
      }
    ).toThrow(new Error(`'keyIdSelector' cannot be a match field.`));
  });

  it('Linked items are loaded in results state on ngOnInit', async(() => {
    let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Linked,
      item: item
    });

    component.matches = observableOf([linkRecordMatch]);

    fixture.detectChanges();

    state.pipe(
      observableMap(s => s.results.items),
      take(1)
    )
      .subscribe(r => {
        let result = r[0];
        expect(result.status).toEqual(SKY_LINK_RECORDS_STATUSES.Linked);
      });
  }));

  it('linked items w\ new fields are loaded in results state on ngOnInit', async(() => {
    let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    let field = new SkyLinkRecordsFieldModel({
      key: 'name',
      label: 'name',
      currentValue: 'Kevin',
      newValue: 'Brian'
    });

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Linked,
      item: item
    });

    component.matches = observableOf([linkRecordMatch]);

    dispatcher.next(new SkyLinkRecordsSelectedSetSelectedAction('1', 'name', true));
    dispatcher.next(new SkyLinkRecordsFieldsSetFieldsAction('1', [field]));

    fixture.detectChanges();

    state.pipe(
      observableMap(s => s.results.items),
      take(1)
    )
      .subscribe(r => {
        let result = r[0];
        expect(result.status).toEqual(SKY_LINK_RECORDS_STATUSES.Linked);
        expect(result.item.name).toEqual(field.newValue);
      });
  }));

  it('linked item w\ new fields not in results if not in selection on ngOnInit', async(() => {
    let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    let field = new SkyLinkRecordsFieldModel({
      key: 'name',
      label: 'name',
      currentValue: 'Kevin',
      newValue: 'Brian'
    });

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Linked,
      item: item
    });

    component.matches = observableOf([linkRecordMatch]);
    dispatcher.next(new SkyLinkRecordsFieldsSetFieldsAction('1', [field]));

    fixture.detectChanges();

    state.pipe(
      observableMap(s => s.results.items),
      take(1)
    )
      .subscribe(r => {
        let result = r[0];
        expect(result.status).toEqual(SKY_LINK_RECORDS_STATUSES.Linked);
        expect(result.item.name).not.toEqual(field.newValue);
      });
  }));

  it('records returns item match if match key equals keyIdSelector', async(() => {
    let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Created,
      item: { id: '22' }
    });

    component.items = observableOf([item]);
    component.matches = observableOf([linkRecordMatch]);

    fixture.detectChanges();

    component.records.pipe(take(1))
      .subscribe((r: SkyLinkRecordsItemModel[]) => {
        let record = r[0];
        expect(record.key).toEqual(linkRecordMatch.key);
        expect(record.status).toEqual(linkRecordMatch.status);
      });
  }));

  it('records returns undefined match if status is no match', async(() => {
     let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    component.items = observableOf([item]);

    fixture.detectChanges();

    component.records.pipe(take(1)).subscribe((r: SkyLinkRecordsItemModel[]) => {
      let record = r[0];
      expect(record.status).toEqual(SKY_LINK_RECORDS_STATUSES.NoMatch);
    });
  }));

  it('records returns no match instance if matches is empty', async(() => {
     let item = {
      id: '1',
      address: '123',
      name: 'Kevin'
    };

    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.NoMatch,
      item: { id: '22' }
    });

    component.items = observableOf([item]);
    component.matches = observableOf([linkRecordMatch]);

    fixture.detectChanges();

    component.records.pipe(take(1))
      .subscribe((r: SkyLinkRecordsItemModel[]) => {
        let record = r[0];
        expect(record.match).toBeUndefined();
      });
  }));

  it('results are returned from state', async(() => {
    let linkRecordResult = new SkyLinkRecordsResultModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Created,
      item: {}
    });

    dispatcher.next(new SkyLinkRecordsResultsLoadAction([linkRecordResult]));

    component.results.pipe(take(1))
      .subscribe((r: SkyLinkRecordsResultModel[]) => {
        let result = r;
        expect(result.length > 0).toBe(true);
      });
  }));

  it('recordMatches are returned from state', async(() => {
    let linkRecordMatch = new SkyLinkRecordsMatchModel({
      key: '1',
      status: SKY_LINK_RECORDS_STATUSES.Created,
      item: { id: '11' }
    });

    dispatcher.next(new SkyLinkRecordsMatchesLoadAction([linkRecordMatch]));

    component.recordMatches.pipe(take(1))
      .subscribe((m: SkyLinkRecordsMatchModel[]) => {
        let matches = m;
        expect(matches.length > 0).toBe(true);
      });
  }));

  it('SkyLinkRecordsItemModel undefined constructor data init defaults fields', () => {
    let linkRecordItem = new SkyLinkRecordsItemModel();

    expect(linkRecordItem.key).toBeUndefined();
    expect(linkRecordItem.status).toBeUndefined();
    expect(linkRecordItem.item).toBeUndefined();
    expect(linkRecordItem.match).toBeDefined();
    expect(linkRecordItem.matchFields).toBeDefined();
  });

  it('should pass accessibility', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement).toBeAccessible();
    });
  }));
});
