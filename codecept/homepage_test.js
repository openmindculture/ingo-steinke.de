Feature('homepage');

Scenario('test something', ({ I }) => {
  I.amOnPage('file:///home/ingo/Code/ingo-steinke.de/dist/index.html');
  I.see('Ingo Steinke', 'h1');
});
