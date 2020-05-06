import {
  DebugElement
} from '@angular/core';

import {
  async,
  TestBed,
} from '@angular/core/testing';

import {
  SkyLinkRecordsModule
} from './link-records.module';

import {
  SkyLinkRecordsNoMatchContentContentChildrenTestComponent
} from './fixtures/link-records-nomatch-content.component.content-children.fixture';

import {
  SkyLinkRecordsNoMatchContentInputTemplateTestComponent
} from './fixtures/link-records-nomatch-content.component.input-template.fixture';

describe('Component: SkyLinkRecordsNoMatchContentComponent', () => {
  let fixture: any,
    element: DebugElement;

  describe('Fixture: inputTemplate', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SkyLinkRecordsNoMatchContentInputTemplateTestComponent
        ],
        imports: [
          SkyLinkRecordsModule
        ]
      });

      fixture = TestBed.createComponent(SkyLinkRecordsNoMatchContentInputTemplateTestComponent);
      element = fixture.debugElement as DebugElement;
    }));

    it('template setter defines inputTemplate for content', () => {
      fixture.detectChanges();
      let elementItems = element.children[0].children.filter(
        (item) => { return item.name === 'sky-link-records-nomatch-content'; });
      let component = elementItems[0].componentInstance;

      expect(component.template).toBeDefined();
    });
  });

  describe('Fixture: contentChildren', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SkyLinkRecordsNoMatchContentContentChildrenTestComponent
        ],
        imports: [
          SkyLinkRecordsModule
        ]
      });

      fixture = TestBed.createComponent(SkyLinkRecordsNoMatchContentContentChildrenTestComponent);
      element = fixture.debugElement as DebugElement;
    }));

    it('content children defines template for content', () => {
      fixture.detectChanges();
      let elementItems = element.children[0].children.filter(
        (item) => { return item.name === 'sky-link-records-nomatch-content'; });
      let component = elementItems[0].componentInstance;

      expect(component.template).toBeDefined();
    });
  });
});
