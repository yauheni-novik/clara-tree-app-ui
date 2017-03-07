/**
 * Created by Yauheni_Novik on 3/7/2017.
 */
export default class Hierarchies {
    constructor($http, AppConstants) {
        'ngInject';

        this._$http = $http;
        this._AppConstants = AppConstants;
    }

    addHierarchy(hierarchy) {
        return this._$http({
            url: `${this._AppConstants.api}/hierarchies`,
            method: 'POST',
            data: hierarchy
        }).then((res) => res.data);
    }

    getAllHierarchies() {
        return this._$http({
            url: `${this._AppConstants.api}/hierarchies`,
            method: 'GET'
        }).then((res) => res.data);
    }

    revomeHierarchy(hierarchyId) {
        return this._$http({
            url: `${this._AppConstants.api}/hierarchies/${hierarchyId}`,
            method: 'DELETE'
        }).then((res) => res.data);
    }

    updateHierarchy(hierarchy) {
        return this._$http({
            url: `${this._AppConstants.api}/hierarchies`,
            method: 'PUT',
            data: hierarchy
        }).then((res) => res.data);
    }
}
