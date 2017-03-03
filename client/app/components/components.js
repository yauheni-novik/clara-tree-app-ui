import angular from 'angular';
import { home } from './home/home';
import { dataList } from './dataList/dataList';

const components = angular.module('app.components', [
    dataList.name,
    home.name
]);

export { components };
