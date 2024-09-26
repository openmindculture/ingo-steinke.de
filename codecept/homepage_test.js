Feature('Homepage');

Scenario('Test website content and navigation', ({ I }) => {

  // Set prepareScreenshotBaseImages to true to regenerate and save all screenshots,
  // set prepareScreenshotBaseImages to compare upcoming tests to saved screenshots:
  let prepareScreenshotBaseImages = false ;

  I.amOnPage('/');
  I.see('Ingo Steinke', 'h1');
  I.see('Creative Web Developer');

  I.saveScreenshot('Homepage_Screenshot.png');
  I.seeVisualDiff('Homepage_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });

  // I can "see" something below the fold (implicitly scrolling it into view?)
  // but then, how can we test links scrolling down to another one-pager section?
  I.seeElement('//a[contains(., "Datenschutz")]');

  // By default, CodeceptJS tries to find the button or link with the exact text on it
  I.click('Datenschutz');
  I.see('Umfang der Verarbeitung personenbezogener Daten');
  I.see('Schreib mir eine Nachricht');
  I.see('Nachricht absenden');
  I.see('buche einen Termin');

  // We can ensure NOT to see something:
  I.dontSeeElement('.error');

  // TODO local links should not point to fixed production urls!
  // TODO how to test language page linking locally?
  // then we could also verify sub-page layout and correct cross-linking by zig-zag clicking
  // but as a pragmatic workaround, we could use a classic dead-link-checker
  // and check for search console errors after deployment

  I.amOnPage('/webseiten-klimafreundlich-barrierefrei-optimieren/');
  I.see('Webseiten klimafreundlich und barrierefrei optimieren lassen');
  I.saveScreenshot('Sustainability_DE_Screenshot.png');
  I.seeVisualDiff('Sustainability_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });

  I.amOnPage('/wordpress-website-nachhaltig-optimieren-lassen/');
  I.see('Individuell optimierte WordPress-Themes');
  I.saveScreenshot('WordPress_DE_Screenshot.png');
  I.seeVisualDiff('WordPress_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });

  I.amOnPage('/zertifizierter-shopware-6-frontend-webentwickler/');
  I.saveScreenshot('Shopware_DE_Screenshot.png');
  I.seeVisualDiff('Shopware_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });


  I.amOnPage('/leistungen/webentwickler-berlin-freelancer.html');
  I.saveScreenshot('Freelancer_Berlin_DE_Screenshot.png');
  I.seeVisualDiff('Freelancer_Berlin_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });

  I.amOnPage('/leistungen/webentwicklung.html');
  I.see("Wir bauen deine Website!");
  I.saveScreenshot('Services-Web_DE_Screenshot.png');
  I.seeVisualDiff('Services-Web_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });

  I.amOnPage('/leistungen/website-check.html');
  I.see("wir überprüfen deine Website!");
  I.saveScreenshot('Services-Check_DE_Screenshot.png');
  I.seeVisualDiff('Services-Check_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });

  I.amOnPage('/leistungen/optimierung.html');
  I.see("Websites erweitern, überarbeiten und optimieren lassen");
  I.saveScreenshot('Services-Optimization_DE_Screenshot.png');
  I.seeVisualDiff('Services-Optimization_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });
});
