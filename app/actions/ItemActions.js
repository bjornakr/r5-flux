import Dispatcher from '../Dispatcher.js';
import Constants from '../constants/ItemConstants.js';

export default {
    addItemToPersonalBelongings: (item) => {
        Dispatcher.dispatch({action: Constants.AddItemToPersonalBelongings, item: item})
    }
}