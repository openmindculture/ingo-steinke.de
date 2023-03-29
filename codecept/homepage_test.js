Feature('Homepage');

Scenario('Test website content and navigation', async({ I }) => {

  I.amOnPage('/');
  I.see('Ingo Steinke', 'h1');
  I.see('Creative Web Developer');

  // assume (default) "desktop" width as defined in codecept.conf.js
  I.saveScreenshot('screenshot.png');
  I.seeVisualDiff('screenshot.png', {
    tolerance: 2,
    prepareBaseImage: false // true: overwrite base images, false: compare
  });

  // If there is a mobile burger menu button, we must click it first.
  // As conditionals are not allowed in test scenarios,
  // we could find a more generic click path that applies to any device variation.
  // Workaround: define an alternative in Xpath even if that means a redundant click on 'Projekte':
  I.seeElement('//a[contains("class", "menu-toggle") or contains(., "Inhalt") or contains(., "Projekte")]');

  // I can "see" something below the fold (implicitly scrolling it into view?)
  // but then, how can we test links actually scrolling down to another one-pager section?
  I.see('Projekte');

  // By default, CodeceptJS tries to find the button or link with the exact text on it
  // but we might need XPath here as well to make it work inside the mobile menu, but why?
  // the following still fails with Node is either not clickable or not an HTMLElement
  I.click('//a[contains(., "Projekte") or contains(href, "#projects")]');
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
