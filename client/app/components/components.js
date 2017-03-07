import angular from 'angular';
import { home } from './home/home';
import { hierarchyEditor } from './hierarchyEditor/hierarchyEditor';
import { dataList } from './dataList/dataList';

const components = angular.module('app.components', [
    dataList.name,
    home.name,
    hierarchyEditor.name
]);

export { components };
