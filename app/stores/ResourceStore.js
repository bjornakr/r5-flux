import {EventEmitter} from 'events';
import Dispatcher from './../Dispatcher.js';
import Constants from './../constants/ResourceConstants.js';
import ItemActions from './../actions/ItemActions.js';

let resources = {
    [Constants.Dinero]: {name: "Dinero", count: 1000},
    [Constants.Madera]: {name: "Madera", count: 0}
};

let workers = {
    [Constants.Madera]: {name: "Lumberjack", price: 50, hiredCount: 0}
};

let ChangeEvent = Symbol();

class _ResourceStore extends EventEmitter {

    getState() {
        return {
            resources: resources,
            workers: workers
        }
    }

    getState(resource) {
        return {
            resource: resources[resource],
            workers: workers[resource]
        }
    }

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
        resources[Constants.Madera].count += 0.1 * workers[Constants.Madera].hiredCount;
        ResourceStore.emitChange();
    }, 100);
};

produce();

var factor = (resourceCount) => {
    if (resourceCount >= 10) {
        return 10 * factor(resourceCount / 10);
    }
    else {
        return 1;
    }
};

/**
 * Subtracts money from account.
 *
 * @param {number} amount
 * @returns {boolean} true if account holds sufficient money, and money has been subtracted.
 */
var spendMoney = (amount) => {
    if (amount <= resources[Constants.Dinero].count) {
        resources[Constants.Dinero].count -= amount;
        return true;
    }
    return false;
};

/**
 * Hire a worker for the given resource.
 *
 * @returns {boolean} True if worker was successfully hired.
 * @param {symbol} resource
 */
var hireWorker = (resource) => {
    let worker = workers[resource];
    if (spendMoney(worker.price)) {
        worker.hiredCount++;
        return true;
    }
    return false;
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
            if (!hireWorker(payload.resource)) {
                isValidAction = false;
            }
            break;
        default:
            isValidAction = false;
    }

    if (isValidAction) {
        ResourceStore.emitChange();
    }
});
