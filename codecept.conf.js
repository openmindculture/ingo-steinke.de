const { setHeadlessWhen, setWindowSize } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

setWindowSize(1600, 1200);

exports.config = {
  tests: './codecept/*_test.js',
  output: './codecept/output',
  helpers: {
    Puppeteer: {
      url: 'file:///home/ingo/Code/ingo-steinke.de/dist/index.html',
      show: true,
      windowSize: '1200x900'
    }
  },
  include: {
    I: './codecept/steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'ingo-steinke.de',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}
