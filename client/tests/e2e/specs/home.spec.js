/**
 * Created by Yauheni_Novik on 3/14/2017.
 */

var EC = protractor.ExpectedConditions;
var nconf = require('nconf');
var HomePage = require('../pages/home.po');
var HierarchyEditorPage = require('../pages/hierarchyEditor.po');

describe('Home page ', function () {
    var homePage;
    var hierarchyEditorPage;

    var tests = function (user) {

        describe('Load home page', function () {
            it('should open login page', function (done) {
                homePage = new HomePage();
                hierarchyEditorPage = new HierarchyEditorPage();
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
                expect(EC.presenceOf(homePage.hierarchyLINKByName('Test Hierarchy 1'))).toBeTruthy();

                done();
            });

            it('should open hierarchy', function (done) {
                homePage.hierarchyLINKByName('Test Hierarchy 1').click();

                expect(homePage.pageHeaderTitle.getText()).toEqual('Edit Hierarchy');

                done();
            });

            it('should add new office', function (done) {
                hierarchyEditorPage.addHierarchyChildButton.click();
                expect(hierarchyEditorPage.modalTitle.getText()).toEqual('Add office');
                expect(hierarchyEditorPage.okModalButton.isEnabled()).toBeFalsy();
                hierarchyEditorPage.hierarchyOfficeNameInput.sendKeys('Test office 1');
                expect(hierarchyEditorPage.okModalButton.isEnabled()).toBeTruthy();
                hierarchyEditorPage.okModalButton.click();

                expect(EC.presenceOf(hierarchyEditorPage.getOfficeTitleByName('Test office 1'))).toBeTruthy();

                done();
            });

            it('should add new office child', function (done) {
                hierarchyEditorPage.addButtonByName('Test office 1').click();
                expect(hierarchyEditorPage.modalTitle.getText()).toEqual('Add office');
                expect(hierarchyEditorPage.okModalButton.isEnabled()).toBeFalsy();
                hierarchyEditorPage.hierarchyOfficeNameInput.sendKeys('Test office child 1');
                expect(hierarchyEditorPage.okModalButton.isEnabled()).toBeTruthy();
                hierarchyEditorPage.okModalButton.click();
                hierarchyEditorPage.expandButtonByName('Test office 1').click();
                expect(EC.presenceOf(hierarchyEditorPage.getOfficeTitleByName('Test office child 1'))).toBeTruthy();

                done();
            });

            it('should add metadata to new office child', function (done) {
                hierarchyEditorPage.editButtonByName('Test office child 1').click();
                browser.wait(EC.presenceOf(hierarchyEditorPage.modalTitle), browser.allScriptsTimeout);
                expect(hierarchyEditorPage.modalTitle.getText()).toEqual('Edit metadata');
                expect(hierarchyEditorPage.okModalButton.isEnabled()).toBeFalsy();
                hierarchyEditorPage.dataListAddInput.sendKeys('User 1');
                hierarchyEditorPage.dataListAddButton.click();
                expect(hierarchyEditorPage.okModalButton.isEnabled()).toBeTruthy();
                expect(EC.presenceOf(hierarchyEditorPage.getUserTitleByName('User 1'))).toBeTruthy();
                hierarchyEditorPage.dataListAddInput.sendKeys('User 2');
                hierarchyEditorPage.dataListAddButton.click();
                expect(EC.presenceOf(hierarchyEditorPage.getUserTitleByName('User 2'))).toBeTruthy();
                hierarchyEditorPage.okModalButton.click();

                done();
            });

            it('should delete added hierarchy', function (done) {
                var testHierarchy = homePage.hierarchyLINKByName('Test Hierarchy 1');
                homePage.goHomePage(browser.baseUrl);
                homePage.deleteButtonByName('Test Hierarchy 1').click();

                expect(EC.stalenessOf(testHierarchy)).toBeTruthy();

                done();
            });
        });
    };

    tests();
});
