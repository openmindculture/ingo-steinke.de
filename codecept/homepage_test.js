Feature('Homepage');

Scenario('Test website content and navigation', ({ I }) => {

  // Set prepareScreenshotBaseImages to true to regenerate and save all screenshots,
  // set prepareScreenshotBaseImages to compare upcoming tests to saved screenshots:
  let prepareScreenshotBaseImages = true;

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

  // We can ensure NOT to see something:
  I.dontSeeElement('.error');

  I.click('Kontakt');
  I.see('Schreib mir eine Nachricht');
  I.see('Nachricht absenden');
  I.see('buche einen Termin');

  // TODO local links should not point to fixed production urls!
  // TODO how to test language page linking locally?
  // then we could also verify sub-page layout and correct cross-linking by zig-zag clicking
  // but as a pragmatic workaround, we could use a classic dead-link-checker
  // and check for search console errors after deployment

  I.click('Nachhaltigkeit');
  I.see('Webseiten klimafreundlich und barrierefrei optimieren lassen');
  I.see('Beratungsgespräch vereinbaren');
  I.saveScreenshot('Sustainability_DE_Screenshot.png');
  I.seeVisualDiff('Sustainability-Optimize_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });

  I.amOnPage('/wordpress-website-nachhaltig-optimieren-lassen/index.html');
  I.see('Individuell optimierte WordPress-Themes');
  I.see('Kontakt aufnehmen');
  I.saveScreenshot('WordPress_DE_Screenshot.png');
  I.seeVisualDiff('WordPress_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });

  I.amOnPage('/leistungen/webentwickler-berlin-freelancer.html');
  I.see('jetzt Kontakt aufnehmen');
  I.saveScreenshot('Freelancer_Berlin_DE_Screenshot.png');
  I.seeVisualDiff('Freelancer_Berlin_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });

  I.amOnPage('/leistungen/webentwickler-berlin-freelancer.html');
  I.see('jetzt Kontakt aufnehmen');
  I.saveScreenshot('Shopware_DE_Screenshot.png');
  I.seeVisualDiff('Shopware_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });



  I.amOnPage('/wordpress-website-nachhaltig-optimieren-lassen/index.html');
  I.see('Individuell optimierte WordPress-Themes');
  I.see('Kontakt aufnehmen');
  I.saveScreenshot('WordPress_DE_Screenshot.png');
  I.seeVisualDiff('WordPress_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });

  I.click('deutsch');
  I.see("Wir bauen deine Website!");
  I.see('Beratungstermin vereinbaren');
  I.saveScreenshot('Services-Web_DE_Screenshot.png');
  I.seeVisualDiff('Services-Web_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });

  I.click('Web-Check');
  I.see("Website überprüfen");
  I.see('Beratungstermin vereinbaren');
  I.saveScreenshot('Services-Check_DE_Screenshot.png');
  I.seeVisualDiff('Services-Check_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });

  I.click('English');
  I.see('verify your website');
  I.see('schedule an appointment');
  I.saveScreenshot('Services-Check_EN_Screenshot.png');
  I.seeVisualDiff('Services-Check_EN_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });

  I.click('optimize');
  I.see('optimize your website');
  I.see('schedule an appointment');
  I.saveScreenshot('Services-Optimize_EN_Screenshot.png');
  I.seeVisualDiff('Services-Optimize_EN_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });

  I.click('deutsch');
  I.see('erweitern, überarbeiten und optimieren');
  I.see('Beratungstermin vereinbaren');
  I.saveScreenshot('Services-Optimize_DE_Screenshot.png');
  I.seeVisualDiff('Services-Optimize_DE_Screenshot.png', {
    tolerance: 2,
    prepareBaseImage: prepareScreenshotBaseImages
  });


});
