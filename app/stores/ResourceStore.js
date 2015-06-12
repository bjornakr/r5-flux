import {EventEmitter} from 'events';
import Dispatcher from './../Dispatcher.js';
import Constants from './../constants/ResourceConstants.js';
import ItemActions from './../actions/ItemActions.js';

let resources = {
    [Constants.Dinero]: {name: "Dinero", count: 450},
    [Constants.Madera]: {name: "Madera", count: 0}
};

let ChangeEvent = Symbol();

class _ResourceStore extends EventEmitter {

    getResource(type) {
        return resources[type];
    }

    emitChange() {
        this.emit(ChangeEvent);
    }

    /**
     * @param {function} callback
     */
    addChangeListener(callback) {
        this.on(ChangeEvent, callback);
    }

    /**
     * @param {function} callback
     */
    removeChangeListener(callback) {
        this.removeListener(this.changeEvent, callback);
    }
}

let ResourceStore = new _ResourceStore();
export default ResourceStore;


Dispatcher.register(function (payload) {
    let isValidAction = true;

    switch (payload.action) {
        case Constants.AddResource:
            resources[payload.type].count += 1 * payload.tool.level;
            console.log("STORE: Add resource (" + resources[payload.type] + ")");
            break;
        case Constants.SellResource:
            let resourceCount = resources[payload.type].count;
            function factor(resourceCount) {
                return Math.pow(10, this.factor(resourceCount % 10));
            };
            resources[payload.type].count --;
            resources[Constants.Dinero].count += 5;
            break;
        case Constants.BuyItem:
            resources[Constants.Dinero].count -= payload.item.price;
            ItemActions.addItemToPersonalBelongings(payload.item);
            break;
        default:
            isValidAction = false;
    }

    if (isValidAction) {
        ResourceStore.emitChange();
    }
});
