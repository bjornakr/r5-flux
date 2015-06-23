import React from 'react';
import {Overview, Store, Tavern} from '../../constants/LocationConstants.js';
import Constants from '../../constants/LocationConstants.js';
import LocationOverviewBaseComponent from './OverviewBaseComponent.jsx';
import LocationComponent from './LocationComponent.jsx';

export default class TownLocationOverviewComponent extends LocationOverviewBaseComponent {

    render() {
        let buttonStyle = this.getButtonStyle();
        return (
            <fieldset style={{ textAlign: "center" }}>
                <legend><h1>Town</h1></legend>
                <LocationComponent className={"bg-blue"} style={buttonStyle} locationKey={Overview} />
                <LocationComponent className={"bg-navy"} style={buttonStyle} locationKey={Store} />
                <LocationComponent className={"bg-orange"} style={buttonStyle} locationKey={Tavern} />
            </fieldset>
        );
    }
} 