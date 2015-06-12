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
        console.log("ACTION: GATHER RESOURCE");
        Dispatcher.dispatch({ action: Constants.AddResource, type: type, tool: tool });
    },

    chopMadera: () => {
        addResource(Constants.Madera);
    },

    sellMadera: () => {
        sellResource(Constants.Madera);
    },

    buyItem: (item) => {
        console.log("ACTION: BUY ITEM");
        Dispatcher.dispatch({ action: Constants.BuyItem, item: item });
    }
}
