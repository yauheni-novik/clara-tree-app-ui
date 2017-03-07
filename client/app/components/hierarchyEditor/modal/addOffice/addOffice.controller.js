/**
 * Created by Yauheni_Novik on 2/28/2017.
 */
class AddOfficeCtrl {
    officeName = '';

    constructor($uibModalInstance, officeService, parentNode, treeData) {
        this.officeService = officeService;
        this.$uibModalInstance = $uibModalInstance;
        this.parentNode = parentNode;
        this.treeData = treeData;
    }

    ok() {
        const newOffice = {
            title: this.officeName,
            parent: typeof this.parentNode === 'object' ? this.parentNode._id : this.parentNode,
            metadata: { users: [] }
        };

        this.officeService.addNode(newOffice).then((node) => {
            if (typeof this.parentNode === 'object') {
                this.parentNode.children.push(node);
            } else {
                this.treeData.push(node);
            }
        });
        this.$uibModalInstance.close();
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}

AddOfficeCtrl.$inject = ['$uibModalInstance', 'Offices', 'parentNode', 'treeData'];

export { AddOfficeCtrl };
