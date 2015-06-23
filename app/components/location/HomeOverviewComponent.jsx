import assign from 'object-assign';
import React from 'react';
import Actions from '../../actions/LocationActions.js';
import Constants from '../../constants/LocationConstants.js';
import LocationOverviewBaseComponent from './OverviewBaseComponent.jsx';
import LocationComponent from './LocationComponent.jsx';

export default class MainLocationOverviewComponent extends LocationOverviewBaseComponent {

    render() {
        let buttonStyle = this.getButtonStyle();
        let forestStyle = assign({}, buttonStyle);
        let mountainStyle = assign({}, buttonStyle);
        let townStyle = assign({}, buttonStyle);
        //forestStyle["background"] = "#333300";
        //mountainStyle["background"] = "#999966";
        //townStyle["background"] = "#CC9900";

        return (
            <fieldset style={{ textAlign: "center" }}>
                <legend><h1>Overview</h1></legend>
                <LocationComponent className={"bg-green"} style={forestStyle} locationKey={Constants.Forest} />
                <LocationComponent className={"bg-teal"} style={mountainStyle} locationKey={Constants.Mountain} />
                <LocationComponent className={"bg-maroon"} style={townStyle} locationKey={Constants.TownOverview} />
            </fieldset>
        );
    }
}