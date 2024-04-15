module.exports = {
  tests: './codecept/*_test.js',
  output: './codecept/output',
  helpers: {
    Puppeteer: {
      url: '',
      show: true,
      windowSize: '1200x900',
      executablePath: require('puppeteer-core'),
    },
    "ResembleHelper" : {
      "require": "codeceptjs-resemblehelper",
      "screenshotFolder" : "./codecept/output/",
      "baseFolder": "./codecept/screenshots/base/",
      "diffFolder": "./codecept/screenshots/diff/"
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
