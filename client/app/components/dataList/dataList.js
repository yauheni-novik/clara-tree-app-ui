/**
 * Created by Yauheni_Novik on 3/2/2017.
 */
import angular from 'angular';
import { dataListComponent } from './dataList.component';

export const dataList = angular.module('dataList', [])
    .component('listItems', dataListComponent);
