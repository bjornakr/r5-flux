import React from 'react';
import LocationStore from '../stores/LocationStore.js';
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

    constructor() {
        super();
        this.state = LocationStore.getState();
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        LocationStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        LocationStore.removeChangeListener(this._onChange());
    }


    render() {
        return (components[this.state.currentLocation]);
    }

    _onChange() {
        this.setState(LocationStore.getState());
    }
}
