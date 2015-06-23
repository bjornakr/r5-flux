import {EventEmitter} from 'events';
import Dispatcher from './../Dispatcher.js';
import Constants from './../constants/ResourceConstants.js';
import ItemActions from './../actions/ItemActions.js';

let resources = {
    [Constants.Dinero]: {name: "€", count: 40, sellPrice: 1},
    [Constants.Madera]: {name: "Madera", count: 0, sellPrice: 1, gatherVerb: 'Chop'},
    [Constants.Stone]: {name: "Stone", count: 0, sellPrice: 1.5, gatherVerb: 'Pick'}
};

let workers = {
    [Constants.Madera]: {name: "Lumberjack", price: 50, hiredCount: 0},
    [Constants.Stone]: {name: "Mason", price: 100, hiredCount: 0}
};

let ChangeEvent = Symbol();
let WorkerEvent = Symbol();

class _ResourceStore extends EventEmitter {

    getState() {
        return {
            resources: resources,
            workers: workers
        }
    }

    getStateForResource(resourceKey) {
        let canBuyWorker = false;
        if (workers[resourceKey]) {
            canBuyWorker = resources[Constants.Dinero].count >= workers[resourceKey].price;
        }
        return {
            resource: resources[resourceKey],
            workers: workers[resourceKey],
            canBuyWorker: canBuyWorker
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
        this.removeListener(ChangeEvent, callback);
    }

    addWorkerChangeListener(callback) {
        this.on(WorkerEvent, callback);
    }

    removeWorkerChangeListener(callback) {
        this.removeListener(WorkerEvent, callback);
    }

    emitWorkerChange() {
        this.emit(WorkerEvent);
    }
}

let ResourceStore = new _ResourceStore();
export default ResourceStore;

var produce = () => {
    setInterval(function() {
        _.each([Constants.Madera, Constants.Stone], (resource) => {
            resources[resource].count += 0.1 * workers[resource].hiredCount;
        });
        ResourceStore.emitChange();
    }, 100);
};

produce(); // TODO: BGRX

var factor = (resourceCount) => {
    if (resourceCount < 1) {
        return resourceCount;
    }
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
        ResourceStore.emitWorkerChange();
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

var sellResource = (resourceType) => {
    let resource = resources[resourceType];
    let resourceCount = resource.count;
    let sellAmount = factor(resourceCount);
    resources[resourceType].count -= sellAmount;
    resources[Constants.Dinero].count += resources[resourceType].sellPrice * sellAmount;
};

Dispatcher.register(function (payload) {
    let isValidAction = true;
    let isMoneyTransaction = false;

    switch (payload.action) {
        case Constants.AddResource:
            resources[payload.type].count += 1 * payload.tool.level;
            break;
        case Constants.SellResource:
            sellResource(payload.type);
            isMoneyTransaction = true;
            break;
        case Constants.BuyItem:
            resources[Constants.Dinero].count -= payload.item.price;
            ItemActions.addItemToPersonalBelongings(payload.item);
            break;
        case Constants.HireWorker:
            if (!hireWorker(payload.resource)) {
                isValidAction = false;
            }
            else {
                isMoneyTransaction = true;
            }
            break;
        default:
            isValidAction = false;
    }

    if (isValidAction) {
        ResourceStore.emitChange();
    }
    if (isMoneyTransaction) {
        ResourceStore.emitWorkerChange();
    }
});
