import assign from 'object-assign';
import React from 'react';

export default class LocationOverviewComponent extends React.Component {

    render() {


        let buttonStyle = {
            minHeight: 150,
            minWidth: 150,
            borderRadius: 10,
            color: "#FFFFFF",
            textShadow: "3px 3px 5px #333333",
            //backgroundImage: "-webkit-linear-gradient(top, #34d934, #214d23)",
            fontSize: 20
        };

        let forestStyle = assign({}, buttonStyle);
        let mountainStyle = assign({}, buttonStyle);
        let townStyle = assign({}, buttonStyle);
        forestStyle["background"] = "#244700";
        mountainStyle["background"] = "#999966";
        townStyle["background"] = "#CC9900";

        return (
            <fieldset style={{ textAlign: "center" }}>
                <legend><h1>Overview</h1></legend>
                <button style={forestStyle}>Forest</button>
                <button style={mountainStyle}>Mountains</button>
                <button style={townStyle}>Town</button>
            </fieldset>
        );
    }
} 