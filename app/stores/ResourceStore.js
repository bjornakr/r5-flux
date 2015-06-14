import {EventEmitter} from 'events';
import Dispatcher from './../Dispatcher.js';
import Constants from './../constants/ResourceConstants.js';
import ItemActions from './../actions/ItemActions.js';

let resources = {
    [Constants.Dinero]: {name: "Dinero", count: 450},
    [Constants.Madera]: {name: "Madera", count: 0}
};

let hiredWorkers = {
    [Constants.Madera]: 1
};

let workerPrices = {
    [Constants.Madera]: 50
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

var produce = () => {
    setInterval(function() {
        resources[Constants.Madera].count += 0.1 * hiredWorkers[Constants.Madera];
        ResourceStore.emitChange();
    }, 100);
};

produce();

var factor = (resourceCount) => {
    if (resourceCount >= 10) {
        return 10 * factor(resourceCount / 20);
    }
    else {
        return 1;
    }
};

var spendMoney = (amount) => {
    resources[Constants.Dinero].count -= amount;
};

var hireWorker = (resource) => {
    spendMoney(workerPrices[resource]);
    hiredWorkers[resource]++;
};

Dispatcher.register(function (payload) {
    let isValidAction = true;

    switch (payload.action) {
        case Constants.AddResource:
            resources[payload.type].count += 1 * payload.tool.level;
            console.log("STORE: Add resource (" + resources[payload.type] + ")");
            break;
        case Constants.SellResource:
            let resourceCount = resources[payload.type].count;
            let self = this;

            console.log(factor(resourceCount));
            resources[payload.type].count -= factor(resourceCount);
            resources[Constants.Dinero].count += 2 * factor(resourceCount);
            break;
        case Constants.BuyItem:
            resources[Constants.Dinero].count -= payload.item.price;
            ItemActions.addItemToPersonalBelongings(payload.item);
            break;
        case Constants.HireWorker:
            console.log("STORE: HIRE WORKER (" + payload.resource.toString() + ")");
            hireWorker(payload.resource);
        default:
            isValidAction = false;
    }

    if (isValidAction) {
        ResourceStore.emitChange();
    }
});
