/**
 * Created by Yauheni_Novik on 2/28/2017.
 */
class AddOfficeCtrl {
    officeName = '';

    constructor($uibModalInstance, officeService, parentNode, treeData) {
        this.title = 'Nicolas Cage';
        this.officeService = officeService;
        this.$uibModalInstance = $uibModalInstance;
        this.parentNode = parentNode;
        this.treeData = treeData;
    }

    ok() {
        const newOffice = {
            title: this.officeName,
            parent: this.parentNode ? this.parentNode._id : null
        };

        this.officeService.addNode(newOffice).then((node) => {
            if (this.parentNode) {
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
