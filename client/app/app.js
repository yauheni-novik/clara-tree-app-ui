import 'normalize.css';
import 'font-awesome-webpack';

import { appComponent } from './app.component';

import * as angular from 'angular';
import 'angular-ui-router';
import 'angular-bootstrap-grid-tree/src/tree-grid-directive';
import 'angular-ui-bootstrap';

import { components } from './components/components';
import constants from './config/app.constants';
import OfficeService from './services/index';

angular.module('app', [
    'ui.router',
    'treeGrid',
    'ui.bootstrap',
    components.name,
    OfficeService.name
])
.component('app', appComponent);

angular.module('app').constant('AppConstants', constants);
