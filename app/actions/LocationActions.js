import Dispatcher from '../Dispatcher.js';
import Constants from '../constants/LocationConstants.js';

export default {
    changeLocation: (newLocation) => {
        Dispatcher.dispatch({ action: Constants.ChangeLocation, newLocation: newLocation });
    },
    leaveLocation: (location) => {
        Dispatcher.dispatch({ action: Constants.LeaveLocation, location: location });
    }
}
