const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './*_test.js',
  output: './codecept/output',
  helpers: {
    Puppeteer: {
      url: '$PWD/dist',
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
