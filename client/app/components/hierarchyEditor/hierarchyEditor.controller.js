/**
 * Created by Yauheni_Novik on 3/7/2017.
 */
import addOfficeTemplate from './modal/addOffice/addOffice.modal.html';
import editMetadataTemplate from './modal/editMetadata/editMetadata.modal.html';
import { AddOfficeCtrl } from './modal/addOffice/addOffice.controller.js';
import { EditMetadataCtrl } from './modal/editMetadata/editMetadata.controller.js';

class HierarchyEditorController {
    constructor(officeService, $uibModal, $stateParams) {
        this.officeService = officeService;
        this.$uibModal = $uibModal;
        this.tree_data = [];
        this.rootHierarchyId = $stateParams.id;

        this.loadTree(this.rootHierarchyId);

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
                    edit: (node) => {
                        this.openEditMetadataModal(node);
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

    openEditMetadataModal(parentNode) {
        this.$uibModal.open({
            template: editMetadataTemplate,
            controller: EditMetadataCtrl,
            controllerAs: '$ctrl',
            backdrop: false,
            resolve: {
                editNode: () => parentNode,
                treeData: () => this.tree_data
            }
        });
    }

    loadTree(parentId) {
        this.officeService.getAllNodes(parentId).then((nodes) => {
            this.tree_data = nodes;
        });
    }

}

HierarchyEditorController.$inject = ['Offices', '$uibModal', '$stateParams'];

export { HierarchyEditorController };
