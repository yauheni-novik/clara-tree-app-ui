/**
 * Created by Yauheni_Novik on 3/2/2017.
 */
class DataListController {

    addItem() {
        if (this.item && !this.list.includes(this.item)) {
            this.list.push(this.item);
            this.item = '';
        }
    }

    removeItem(index) {
        this.list.splice(index, 1);
    }
}

DataListController.$inject = ['$scope'];

export { DataListController };
