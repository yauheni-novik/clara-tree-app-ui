import angular from 'angular';
import { home } from './home/home';

const components = angular.module('app.components', [
    home.name
]);

export { components };
