import Dispatcher from './../Dispatcher.js';
import Constants from './../constants/ResourceConstants.js';

var addResource = (type) => {
    Dispatcher.dispatch({ action: Constants.AddResource, type: type });
};

var sellResource = (type) => {
    Dispatcher.dispatch({ action: Constants.SellResource, type: type })
};


export default {

    gatherResource: (type, tool) => {
        Dispatcher.dispatch({ action: Constants.AddResource, type: type, tool: tool });
    },

    sell: (resource) => {
        Dispatcher.dispatch({ action: Constants.SellResource, type: resource })
    },

    //chopMadera: () => {
    //    addResource(Constants.Madera);
    //},
    //
    //sellMadera: () => {
    //    sellResource(Constants.Madera);
    //},

    buyItem: (item) => {
        Dispatcher.dispatch({ action: Constants.BuyItem, item: item });
    },

    hireWorker: (resource) => {
        Dispatcher.dispatch({ action: Constants.HireWorker, resource: resource })
    }
}
