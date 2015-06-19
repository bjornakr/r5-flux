import {EventEmitter} from 'events';
import Constants from '../constants/LocationConstants.js';
import Dispatcher from '../Dispatcher.js';

let ChangeEvent = Symbol();


let currentLocation = Constants.Overview;

class _LocationStore extends EventEmitter {
    getState() {
        return {
            currentLocation: currentLocation
        };
    }

    addChangeListener(callback) {
        this.on(ChangeEvent, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(ChangeEvent, callback);
    }

    emitChange() {
        this.emit(ChangeEvent);
    }
}

let LocationStore = new _LocationStore();
export default LocationStore;



Dispatcher.register((payload) => {
    let validAction = true;
    switch (payload.action) {
        case Constants.ChangeLocation:
            currentLocation = payload.newLocation;
            break;
        default:
            validAction = false;
    }

    if (validAction) {
        LocationStore.emitChange();
    }

});