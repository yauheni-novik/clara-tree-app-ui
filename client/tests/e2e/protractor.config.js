'use strict';
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
    dest: 'dist/e2e',
    captureOnlyFailedSpecs: true,
    reportOnlyFailedSpecs: false,
    showSummary: true,
    filename: 'e2eReports.html'
});

exports.config = {
    framework: "jasmine2",
    allScriptsTimeout: 50000,
    //print: function() {} need to change runtime reporter
    specs: ['specs/home.spec.js'],
    seleniumServerJar: '../../../node_modules/selenium-standalone-jar/bin/selenium-server-standalone-3.0.1.jar',
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: "http://localhost:4500/",
    //chromeOnly: true,
    capabilities: {
        browserName: "chrome"
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 45000,
        print: function () {
        }
    },
    onPrepare: function () {
        var reporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new reporters.JUnitXmlReporter({
            savePath: 'dist/e2e'
        }));


        var SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));

        jasmine.getEnv().addReporter(reporter);
        browser.manage().deleteAllCookies();
        browser.manage().window().maximize();
    },
    beforeLaunch: function () {
        return new Promise(function (resolve) {
            reporter.beforeLaunch(resolve);
        });
    },

    afterLaunch: function (exitCode) {
        return new Promise(function (resolve) {
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },
    params: {
        loginUser: {
            username: 'Admin',
            password: 'Admin'
        }
    }
};