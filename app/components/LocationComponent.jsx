import React from 'react';
import Actions from '../actions/LocationActions.js';
import LocationStore from '../stores/LocationStore.js';

export default class LocationComponent extends React.Component {

    constructor(props) {
        super(props);
        this.location = LocationStore.getLocation(this.props.location);
        this._click = this._click.bind(this);
    }

    render() {
        return (
            <button style={this.props.style} onClick={this._click}>{this.location.name}</button>
        );
    }

    _click() {
        Actions.changeLocation(this.props.location);
    }
} 