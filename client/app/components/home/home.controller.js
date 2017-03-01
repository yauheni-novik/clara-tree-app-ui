import addOfficeTemplate from './modal/addOffice.modal.html';
import { AddOfficeCtrl } from './addOffice.controller';

class HomeController {
    constructor($scope, officeService, $uibModal) {
        this.title = 'Nicolas Cage';
        this.officeService = officeService;
        this.$uibModal = $uibModal;

        this.tree_data = [];

        this.loadTree();

        this.expanding_property = {
            field: 'title',
            displayName: 'Name'
        };

        this.col_defs = [
            {
                field: 'actions',
                displayName: 'Actions',
                cellTemplate:
                    '<button ng-click="cellTemplateScope.add(row.branch)" class="btn glyphicon glyphicon-plus" />' +
                    '<button ng-click="cellTemplateScope.edit(row.branch)" class="btn glyphicon glyphicon-pencil" />' +
                    '<button ng-click="cellTemplateScope.delete(row.branch, $parent.tree_rows)" ' +
                    'class="btn glyphicon glyphicon-trash" />',
                cellTemplateScope: {
                    edit: (data) => {
                        console.log(data);
                    },
                    add: (node) => {
                        this.openAddNodeModal(node);
                    },
                    delete: (node, treeNodes) => {
                        officeService.revomeNode(node._id).then(() => {
                            if (!node.parent) {
                                const indexRemovedNode = this.tree_data.findIndex((item) => item._id === node._id);
                                this.tree_data.splice(indexRemovedNode, 1);
                            } else {
                                const parentNode = treeNodes.find((item) => item.branch._id === node.parent);
                                const indexRemovedNode = parentNode.branch.children
                                    .findIndex((item) => item._id === node._id);
                                parentNode.branch.children.splice(indexRemovedNode, 1);
                            }
                        });
                    }
                }
            }
        ];
    }

    openAddNodeModal(parentNode) {
        this.$uibModal.open({
            template: addOfficeTemplate,
            controller: AddOfficeCtrl,
            controllerAs: '$ctrl',
            backdrop: false,
            resolve: {
                parentNode: () => parentNode,
                treeData: () => this.tree_data
            }
        });
    }

    loadTree() {
        this.officeService.getAllNodes().then((nodes) => {
            this.tree_data = nodes;
        });
    }

    $onInit() {
        this.loadGiphs();
    }

    loadGiphs() {
    }
}

HomeController.$inject = ['$scope', 'Offices', '$uibModal'];

export { HomeController };
