import React from 'react';
import LocationStore from '../../stores/LocationStore.js';
import Constants from '../../constants/LocationConstants.js';
import LocationOverviewComponent from './HomeOverviewComponent.jsx';
import TownLocationOverviewComponent from './TownOverviewComponent.jsx';
import GatherResourceComponent from './../GatherResourceComponent.jsx';
import StoreComponent from './Store.jsx';


let components = {
    [Constants.Overview]: <LocationOverviewComponent />,
    [Constants.Forest]: <GatherResourceComponent locationKey={Constants.Forest} />,
    [Constants.Mountain]: <GatherResourceComponent locationKey={Constants.Mountain} />,
    [Constants.TownOverview]: <TownLocationOverviewComponent />,
    [Constants.Store]: <StoreComponent locationKey={Constants.Store} />
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
