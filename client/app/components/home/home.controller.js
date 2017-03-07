import addHierarchyTemplate from './modal/addHierarchy.modal.html';
import { AddHierarchyCtrl } from './modal/addHierarchy.controller';

class HomeController {
    constructor(hierarchyService, $uibModal) {
        this.hierarchyService = hierarchyService;
        this.$uibModal = $uibModal;
        this.loadHierarchies();
    }

    openAddHierarchyModal() {
        this.$uibModal.open({
            template: addHierarchyTemplate,
            controller: AddHierarchyCtrl,
            controllerAs: '$ctrl',
            backdrop: false
        }).result.then(() => {
            this.loadHierarchies();
        });
    }

    loadHierarchies() {
        this.hierarchyService.getAllHierarchies().then((hierarchies) => {
            this.hierarchies = hierarchies;
        });
    }

    deleteHierarchy(hierarchy) {
        this.hierarchyService.revomeHierarchy(hierarchy._id).then(() => this.loadHierarchies());
    }
}

HomeController.$inject = ['Hierarchies', '$uibModal'];

export { HomeController };
