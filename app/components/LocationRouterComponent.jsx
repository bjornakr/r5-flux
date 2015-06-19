import React from 'react';
//import LocationStore from '../stores/LocationStore.jsx';
import Constants from '../constants/LocationConstants.js';
import LocationOverviewComponent from './LocationOverviewComponent.jsx';
import LocationComponent from './LocationComponent.jsx';

let getComponent = () => {
    return <LocationOverviewComponent />
};

let components = {
    [Constants.Overview]: <LocationOverviewComponent />,
    [Constants.Forest]: <LocationComponent />
};

export default class LocationRouterComponent extends React.Component {

    //constructor() {
        //this.state = LocationStore.getState();
    //}

    render() {
        return (components[Constants.Overview]);
    }
}
