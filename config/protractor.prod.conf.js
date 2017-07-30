const { SpecReporter } = require('jasmine-spec-reporter');
// var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var baseConfig = require('./protractor.conf.js');

var prodConfig = {
  directConnect: false,
  baseUrl: process.env.APP_BASE_URL,
  seleniumAddress: process.env.SELENIUM_HUB_URL,
  capabilities: {
    'browserName': 'chrome',
  },
  onPrepare: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv()
           .addReporter(new SpecReporter({
              displayStacktrace: false,
              displaySuiteNumber: true
            }));
  },
  jasmineNodeOpts: {
    showColors: true,
    verbosity: 3,
    isVerbose: true,
    includeStackTrace: false,
    print: function() {}
  }
};

exports.config = Object.assign({}, baseConfig.config, prodConfig);
