/**
 * Created by Yauheni_Novik on 2/28/2017.
 */
export default class Offices {
    constructor($http, AppConstants) {
        'ngInject';

        this._$http = $http;
        this._AppConstants = AppConstants;
    }

    addNode(node) {
        return this._$http({
            url: `${this._AppConstants.api}/nodes`,
            method: 'POST',
            data: node
        }).then((res) => res.data);
    }

    getAllNodes() {
        return this._$http({
            url: `${this._AppConstants.api}/nodes`,
            method: 'GET'
        }).then((res) => res.data);
    }

    revomeNode(nodeId) {
        return this._$http({
            url: `${this._AppConstants.api}/nodes/${nodeId}`,
            method: 'DELETE'
        }).then((res) => res.data);
    }

    updateNode(node) {
        return this._$http({
            url: `${this._AppConstants.api}/nodes`,
            method: 'PUT',
            data: node
        }).then((res) => res.data);
    }
}
