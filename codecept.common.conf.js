module.exports = {
  tests: './codecept/*_test.js',
  output: './codecept/output/default/',
  helpers: {
    Puppeteer: {
      url: '',
      show: true,
      windowSize: '1728x1200',
      fullPageScreenshots: true,
    },
    ResembleHelper : {
      require: 'codeceptjs-resemblehelper',
      screenshotFolder: './codecept/output/default/',
      baseFolder: './codecept/screenshots/base/default/',
      diffFolder: './codecept/screenshots/diff/default/',
    }
  },
  include: {
    I: './codecept/steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'ingo-steinke.de',
  plugins: {
    testomatio: {
      enabled: true,
      require: '@testomatio/reporter/lib/adapter/codecept',
      apiKey: process.env.TESTOMATIO,
    },
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
