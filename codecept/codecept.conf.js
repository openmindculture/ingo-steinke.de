// in codecept.conf.js
const { setWindowSize } = require('@codeceptjs/configure');

setWindowSize(1600, 1200);

exports.config = {
  helpers: {
    Puppeteer: {
      url: 'file:///home/ingo/Code/ingo-steinke.de/dist/index.html',
    },
    Playwright: {
      url: 'file:///home/ingo/Code/ingo-steinke.de/dist/index.html',
    }
  }
}