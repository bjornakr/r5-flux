import {EventEmitter} from 'events';
import Constants from '../constants/LocationConstants.js';
import ResourceConstants from '../constants/ResourceConstants.js';
import Dispatcher from '../Dispatcher.js';

let ChangeEvent = Symbol();

const Overview = Constants.Overview;
const Forest = Constants.Forest;
const Mountain = Constants.Mountain;

let locations = {
    [Overview]: {
        name: "Overview",
        childLocations: [Forest, Mountain]
    },
    [Forest]: {
        name: "Forest",
        parentLocation: Overview,
        resourceKey: ResourceConstants.Madera
    },
    [Mountain]: {
        name: "Mountain",
        parentLocation: Overview,
        resourceKey: ResourceConstants.Stone
    }
};

let currentLocation = Overview;

class _LocationStore extends EventEmitter {
    getState() {
        return {
            currentLocation: currentLocation,
            location: locations[currentLocation],
        };
    }

    getLocation(locationKey) {
        return locations[locationKey];
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
        case Constants.LeaveLocation:
            currentLocation = locations[payload.location].parentLocation;
            console.log(currentLocation);
            break;
        default:
            validAction = false;
    }

    if (validAction) {
        LocationStore.emitChange();
    }

});