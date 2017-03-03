/**
 * Created by Yauheni_Novik on 2/28/2017.
 */
class EditMetadataCtrl {
    officeName = '';

    constructor($uibModalInstance, officeService, editNode, treeData) {
        this.title = 'Nicolas Cage';
        this.officeService = officeService;
        this.$uibModalInstance = $uibModalInstance;
        this.editNode = editNode;
        this.treeData = treeData;
        this.list = editNode.metadata.users;
    }

    ok() {
        const newNode = {
            _id: this.editNode._id,
            title: this.editNode.title,
            parent: this.editNode.parent,
            metadata: this.editNode.metadata
        };

        this.officeService.updateNode(newNode);
        this.$uibModalInstance.close();
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}

EditMetadataCtrl.$inject = ['$uibModalInstance', 'Offices', 'editNode', 'treeData'];

export { EditMetadataCtrl };
