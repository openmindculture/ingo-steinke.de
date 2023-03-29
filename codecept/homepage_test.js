Feature('Homepage');

Scenario('Test website content and navigation', ({ I }) => {

  I.amOnPage('/');
  I.see('Ingo Steinke', 'h1');
  I.see('Creative Web Developer');

  I.saveScreenshot('Homepage_Screenshot.png');
  I.seeVisualDiff('Homepage_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: true
  });

  // I can "see" something below the fold (implicitly scrolling it into view?)
  // but then, how can we test links actually scrolling down to another one-pager section?
  I.seeElement('//a[contains(., "Projekte")]');

  // By default, CodeceptJS tries to find the button or link with the exact text on it
  I.click('Projekte');
  I.see('Eine Auswahl meiner bisherigen Projekte');

  I.seeElement('//a[contains(., "Datenschutz")]');

  I.click('Datenschutz');
  I.see('Umfang der Verarbeitung personenbezogener Daten');

  // We can ensure NOT to see something:
  I.dontSeeElement('.error');
  // I.dontSee('404');

  // so the following would fail:
  // I.dontSee('Ingo');
});
