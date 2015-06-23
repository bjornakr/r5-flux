import React from 'react';
import LocationActions from '../../actions/LocationActions.js';

export default class LeaveBehavior {

    constructor(locationKey) {
        this.locationKey = locationKey;
        this.leave = this.leave.bind(this);
    }

    get leaveButton() {
        return <button onClick={this.leave}>Leave</button>;
    }

    leave() {
        LocationActions.leaveLocation(this.locationKey);
    }
}
