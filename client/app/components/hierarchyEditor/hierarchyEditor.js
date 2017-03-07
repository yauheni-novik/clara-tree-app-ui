/**
 * Created by Yauheni_Novik on 3/7/2017.
 */
import angular from 'angular';
import { hierarchyEditorComponent } from './hierarchyEditor.component';
import { dataList } from '../dataList/dataList';

export const hierarchyEditor = angular.module('hierarchyEditor', [dataList.name])
    .config(($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('hierarchy', {
            url: '/hierarchy/:id',
            template: '<hierarchy-editor></hierarchy-editor>'
        });
    })
    .component('hierarchyEditor', hierarchyEditorComponent);
