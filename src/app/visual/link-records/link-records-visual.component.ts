import { Component } from '@angular/core';

import {
  Observable,
  of as observableOf
} from 'rxjs';

@Component({
  selector: 'link-records-visual',
  templateUrl: './link-records-visual.component.html'
})
export class LinkRecordsVisualComponent {
  public matchFields: Array<any> = [{key: 'description'}, {key: 'name'}];

  public newItem: any = { id: '99', address: 999, name: 'Lime', description: 'Laura eats limes.' };

  public items: Observable<any> = observableOf([
    { id: '1', address: 101, name: 'Apple', description: 'Anne eats apples' }
  ]);

  public longFieldItems: Observable<any> = observableOf([
    { id: '1', address: 101, name: 'Apple', description: 'Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz' }
  ]);

  public matches: Observable<Array<any>> = observableOf([
    {
      key: '1',
      status: 'suggested',
      item: { id: '11', address: 111, name: 'Big Apple', description: 'George and his apples' }
    }
  ]);

  public matches2: Observable<Array<any>> = observableOf([
    {
      key: '1',
      status: 'no_match',
      item: undefined
    }
  ]);
}
