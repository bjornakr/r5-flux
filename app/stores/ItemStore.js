import {EventEmitter} from 'events';
import Dispatcher from '../Dispatcher.js';
import Constants from '../constants/ItemConstants.js';
import ItemTypeConstants from '../constants/ItemTypeConstants.js';
import ResourceConstants from '../constants/ResourceConstants.js';

let ChangeEvent = Symbol();

let personalBelongings = [
    { name: "Dårlig øks", price: 9.90, level: 1, type: ResourceConstants.Madera },
    { name: "Toothpick", price: 0.50, level: 0.1, type: ResourceConstants.Stone }
];
let storeItems = [
    { name: "Kjøttøks", price: 9.99, level: 5, type: ResourceConstants.Madera },
    { name: "Megaøks", price: 99.90, level: 5, type: ResourceConstants.Madera },
    { name: "Hyperøks", price: 499.90, level: 15, type: ResourceConstants.Madera },
    { name: "Schizzøks", price: 9999.90, level: 40, type: ResourceConstants.Madera }
];

class _ItemStore extends EventEmitter {

    getPersonalBelongings() {
        return personalBelongings;
    }

    getStoreItems() {
        return storeItems;
    }

    getToolForResource(resource) {
        return personalBelongings
            .filter(pb => { return pb.type === resource })
            .sort((a, b) => { return a.level < b.level })[0];
    }

    emitChange() {
        this.emit(ChangeEvent);
    }

    addChangeListener(callback) {
        this.on(ChangeEvent, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(ChangeEvent, callback);
    }
}

let ItemStore = new _ItemStore();
export default ItemStore;

Dispatcher.register(function (payload) {
    let isValidAction = true;

    switch (payload.action) {
        case (Constants.AddItemToPersonalBelongings):
            console.log("Bought " + payload.item.name);
            personalBelongings.push(payload.item);
            break;
        default:
            isValidAction = false;
            break;
    }

    if (isValidAction) {
        console.log("ONCE");
        ItemStore.emitChange();
    }
});