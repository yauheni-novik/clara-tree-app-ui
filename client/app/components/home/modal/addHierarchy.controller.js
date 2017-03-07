/**
 * Created by Yauheni_Novik on 3/7/2017.
 */
class AddHierarchyCtrl {
    hierarchyName = '';

    constructor($uibModalInstance, hierarchyService) {
        this.hierarchyService = hierarchyService;
        this.$uibModalInstance = $uibModalInstance;
    }

    ok() {
        const newHierarchy = {
            name: this.hierarchyName,
            description: this.description,
            createdDate: new Date()
        };

        this.hierarchyService.addHierarchy(newHierarchy).then(() => {
            this.$uibModalInstance.close();
        });
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}

AddHierarchyCtrl.$inject = ['$uibModalInstance', 'Hierarchies'];

export { AddHierarchyCtrl };
