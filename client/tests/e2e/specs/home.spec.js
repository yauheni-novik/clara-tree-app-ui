/**
 * Created by Yauheni_Novik on 3/14/2017.
 */

var EC = protractor.ExpectedConditions;
var nconf = require('nconf');
var HomePage = require('../pages/home.po');

describe('Home page ', function () {
    var homePage;

    var tests = function (user) {

        describe('Load home page', function () {
            it('should open login page', function (done) {
                homePage = new HomePage();
                homePage.goHomePage(browser.baseUrl);
                browser.executeScript("return window.sessionStorage.setItem('e2e', true)");
                browser.refresh();

                done();
            });

            it('should open add hierarchy window', function (done) {
                homePage.addHierarchyButton.click();
                expect(homePage.modalTitle.getText()).toEqual('Add hierarchy');

                done();
            });

            it('should add new hierarchy', function (done) {
                expect(homePage.okModalButton.isEnabled()).toBeFalsy();
                homePage.hierarchyNameInput.sendKeys('Test Hierarchy 1');
                expect(homePage.okModalButton.isEnabled()).toBeFalsy();
                homePage.hierarcyDescriptionArea.sendKeys('Test description 1');
                expect(homePage.okModalButton.isEnabled()).toBeTruthy();
                homePage.okModalButton.click();
                expect(EC.presenceOf(homePage.hierarchyTDByName('Test Hierarchy 1'))).toBeTruthy();

                done();
            });

            it('should delete added hierarchy', function (done) {
                homePage.goHomePage(browser.baseUrl);
                homePage.deleteButtonByName.click();

                expect(EC.stalenessOf(homePage.hierarchyTDByName('Test Hierarchy 1'))).toBeTruthy();

                done();
            });
        });
    };

    tests();
});
