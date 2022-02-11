Feature('homepage');

Scenario('test something', ({ I }) => {
  const url = 'file:///home/ingo/Code/ingo-steinke.de/dist/index.html';
  I.amOnPage(url);
  I.see('Ingo Steinke', 'h1');
});
