import React from 'react';
import Actions from '../actions/LocationActions.js';
import LocationStore from '../stores/LocationStore.js';

export default class GatherResourceComponent extends React.Component {

    constructor(props) {
        super(props);
        this.location = LocationStore.getLocation(this.props.locationKey);
        this._leave = this._leave.bind(this);
    }

    render() {
        let chopButtonStyle = {
            minHeight: 50,
            minWidth: 100,
            borderRadius: 5,
            color: "#FBFBFB",
            backgroundColor: "#3D6E97",
            //fontStyle: "italic",
            fontSize: 20
        };

        return (
            <fieldset style={{ textAlign: "center" }}>
                <legend><h1>{this.location.name}</h1></legend>
                <p><strong>Madera</strong> 3 587 789</p>
                <p><button style={chopButtonStyle}>Chop!</button></p>
                <p><button onClick={this._leave}>Leave</button></p>
            </fieldset>
        );
    }

    _leave() {
        Actions.leaveLocation(this.props.locationKey);
    };
}
