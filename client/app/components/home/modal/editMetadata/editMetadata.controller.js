/**
 * Created by Yauheni_Novik on 2/28/2017.
 */
import angular from 'angular';

class EditMetadataCtrl {
    officeName = '';

    constructor($uibModalInstance, officeService, editNode, treeData) {
        this.title = 'Nicolas Cage';
        this.officeService = officeService;
        this.$uibModalInstance = $uibModalInstance;
        this.editNode = editNode;
        this.treeData = treeData;
        this.list = angular.copy(editNode.metadata.users);
    }

    ok() {
        const newNode = {
            _id: this.editNode._id,
            title: this.editNode.title,
            parent: this.editNode.parent,
            metadata: {
                users: this.list
            }
        };

        this.officeService.updateNode(newNode).then((node) => {
            this.editNode.metadata = node.metadata;
        });
        this.$uibModalInstance.close();
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}

EditMetadataCtrl.$inject = ['$uibModalInstance', 'Offices', 'editNode', 'treeData'];

export { EditMetadataCtrl };
