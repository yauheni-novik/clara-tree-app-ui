import angular from 'angular';
import { homeComponent } from './home.component';
import { dataList } from '../dataList/dataList';

export const home = angular.module('home', [dataList.name])
.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url: '/',
        template: '<home></home>'
    });
})
.component('home', homeComponent);
