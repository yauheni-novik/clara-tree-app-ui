/**
 * Created by Yauheni_Novik on 2/28/2017.
 */
import angular from 'angular';

// Create the module where our functionality can attach to
const servicesModule = angular.module('app.services', []);

// Services
import OfficeService from './offices.service';
import HierarchyService from './hierarchy.service';
servicesModule.service('Offices', OfficeService);
servicesModule.service('Hierarchies', HierarchyService);

export default servicesModule;
