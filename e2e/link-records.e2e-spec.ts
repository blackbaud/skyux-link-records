import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  element,
  by
} from 'protractor';

describe('link-records component', () => {
  beforeEach(() => {
    SkyHostBrowser.get('visual/link-records');
    SkyHostBrowser.setWindowBreakpoint('lg');
  });

  it('should display suggested match', (done) => {
    expect('#screenshot-link-records-match').toMatchBaselineScreenshot(done, {
      screenshotName: 'link-records-suggested-match'
    });
  });

  it('should display no match', (done) => {
    expect('#screenshot-link-records-no-match').toMatchBaselineScreenshot(done, {
      screenshotName: 'link-records-no-match'
    });
  });

  it('should display linked match', (done) => {
    element(by.css('#linked-match-records .link-records-item-footer .sky-btn-default')).click();
    expect('#screenshot-link-records-linked-match').toMatchBaselineScreenshot(done, {
      screenshotName: 'link-records-linked-match'
    });
  });

  it('should display created match', (done) => {
    element(by.css('#create-link-records .link-records-item-footer .sky-btn-default')).click();
    expect('#screenshot-link-records-created-match').toMatchBaselineScreenshot(done, {
      screenshotName: 'link-records-created-match'
    });
  });

  it('should display fields to update on a match', (done) => {
    element(by.css('#field-update-records .link-records-item-footer .sky-btn-primary')).click();
    expect('#screenshot-link-records-fields-update').toMatchBaselineScreenshot(done, {
      screenshotName: 'link-records-update-match'
    });
  });

  it('should display created match with long field', (done) => {
    element(by.css('#create-link-records-long-field .link-records-item-footer .sky-btn-default')).click();
    expect('#screenshot-link-records-created-match-long-field').toMatchBaselineScreenshot(done, {
      screenshotName: 'link-records-match-long-field'
    });
  });
});
