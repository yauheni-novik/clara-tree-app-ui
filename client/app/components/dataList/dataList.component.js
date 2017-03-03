/**
 * Created by Yauheni_Novik on 3/2/2017.
 */
import './dataList.scss';
import template from './dataList.html';
import { DataListController as controller } from './dataList.controller';

export const dataListComponent = {
    template,
    controller,
    bindings: {
        list: '='
    }
};
