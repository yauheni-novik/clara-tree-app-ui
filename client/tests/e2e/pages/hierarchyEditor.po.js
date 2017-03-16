/**
 * Created by Yauheni_Novik on 3/16/2017.
 */
'use strict';

var HierarchyEditorPage = function () {
    this.hierarchyOfficeNameInput = element(by.model('$ctrl.officeName'));
    this.dataListAddInput = element(by.css('list-items .elem-inline input'));
    this.dataListAddButton = element(by.css('list-items .elem-inline button'));
    this.addHierarchyChildButton = element(by.css('hierarchy-editor .panel button'));
    this.okModalButton = element(by.css('.btn.btn-success'));
    this.modalTitle = element(by.css('.modal-title'));
    this.pageHeaderTitle = element(by.css('.header-title'));

    this.getUserTitleByName = function (name){
        return element(by.cssContainingText(".list-group .list-group-item .item-title", name));
    };

    this.getOfficeTitleByName = function (name){
        return element(by.cssContainingText(".table tbody tr td span.tree-label", name));
    };
    this.deleteButtonByName = function (name) {
        return getRowOfficeElemByName(name).element(by.css('.glyphicon-trash'));
    };
    this.addButtonByName = function (name) {
        return getRowOfficeElemByName(name).element(by.css('.glyphicon-plus'));
    };

    this.editButtonByName = function (name) {
        return getRowOfficeElemByName(name).element(by.css('.glyphicon-pencil'));
    };

    this.expandButtonByName = function (name) {
        return getRowOfficeElemByName(name).element(by.css('.tree-icon'));
    };

    function getRowOfficeElemByName(name) {
        return element.all(by.repeater('row in tree_rows')).filter(function(elem) {
            return elem.element(by.css(".tree-label")).getText().then(function(text){
                return text === name;
            });
        }).first();
    }
    function getRowUserElemByName(name) {
        return element.all(by.repeater('item in $ctrl.list')).filter(function(elem) {
            return elem.element(by.css(".item-title")).getText().then(function(text){
                return text === name;
            });
        }).first();
    }
};

module.exports = HierarchyEditorPage;