import React from 'react';
import ResourceActions from '../actions/ResourceActions.js';

export default class WorkerComponent extends React.Component {

    constructor(props) {
        super(props);

        this._onClick = this._onClick.bind(this);
    }

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td style={{textAlign: "right"}}>€{this.props.price}</td>
                <td><button type="button" onClick={this._onClick}>Hire</button></td>
            </tr>
        );
    }

    _onClick() {
        ResourceActions.hireWorker(this.props.resource);
    }
}