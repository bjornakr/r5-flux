import assign from 'object-assign';
import React from 'react';
import Actions from '../actions/LocationActions.js';
import Constants from '../constants/LocationConstants.js';
import LocationComponent from './LocationComponent.jsx';

export default class MainLocationOverviewComponent extends React.Component {

    render() {
        let buttonStyle = {
            minHeight: 150,
            minWidth: 150,
            borderRadius: 10,
            color: "#FFFFFF",
            textShadow: "1px 1px 3px #333333",
            fontSize: 30
        };

        let forestStyle = assign({}, buttonStyle);
        let mountainStyle = assign({}, buttonStyle);
        let townStyle = assign({}, buttonStyle);
        //forestStyle["background"] = "#333300";
        //mountainStyle["background"] = "#999966";
        //townStyle["background"] = "#CC9900";

        return (
            <fieldset style={{ textAlign: "center" }}>
                <legend><h1>Overview</h1></legend>
                <LocationComponent className={"bg-green"} style={forestStyle} location={Constants.Forest} />
                <LocationComponent className={"bg-teal"} style={mountainStyle} location={Constants.Mountain} />
                <button className={"bg-orange"} style={townStyle}>Town</button>
            </fieldset>
        );
    }
}