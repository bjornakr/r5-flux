import Dispatcher from '../Dispatcher.js';
import Constants from '../constants/LocationConstants.js';

export default {
    changeLocation: (newLocation) => {
        Dispatcher.dispatch({ action: Constants.ChangeLocation, newLocation: newLocation });
    }
}
