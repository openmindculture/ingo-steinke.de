// in codecept.conf.js
const { setWindowSize } = require('@codeceptjs/configure');

setWindowSize(1600, 1200);

exports.config = {
  helpers: {
    Puppeteer: {
      url: 'https://www.ingo-steinke.de',
    }
  }
}
