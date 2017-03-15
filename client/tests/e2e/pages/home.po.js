/**
 * Created by Yauheni_Novik on 3/14/2017.
 */
'use strict';

var HomePage = function () {
    this.hierarchyNameInput = element(by.model('$ctrl.hierarchyName'));
    this.hierarcyDescriptionArea = element(by.model('$ctrl.description'));
    this.addHierarchyButton = element(by.css('.home .panel button'));
    this.okModalButton = element(by.css('.btn.btn-success'))
    this.modalTitle = element(by.css('.modal-title'));

    this.goHomePage = function (url) {
        browser.driver.get(url);
    };
    this.hierarchyTDByName = function (name){
        return element(by.cssContainingText(".wk-table tbody tr td a", name));
    };
    this.deleteButtonByName = function (name) {
        return getRowElemByName(name).element(by.css('.glyphicon-trash'));
    };

    function getRowElemByName(name) {
        return element.all(by.repeater('item in $ctrl.hierarchies')).filter(function(elem, index) {
            return elem.element(by.css(".hierarchy-link")).getText().then(function(text){
                return text === name;
            });
        }).first();
    }
};

module.exports = HomePage;