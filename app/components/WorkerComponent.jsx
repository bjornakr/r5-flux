import React from 'react';
import ResourceActions from '../actions/ResourceActions.js';
import ResourceStore from '../stores/ResourceStore.js';

export default class WorkerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = ResourceStore.getState(this.props.resource);
        this._onClick = this._onClick.bind(this);

        console.log("RENDER!");
        console.log(this.workerSymbols);
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        ResourceStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ResourceStore.removeChangeListener(this._onChange);
    }

    render() {
        this.workerSymbols = "";
        _.each(_.range(this.state.workers.hiredCount), () => {
            this.workerSymbols += "♟";
        });

        return (
            <tr>
                <td>{this.state.workers.name}</td>
                <td style={{textAlign: "right"}}>€{this.state.workers.price}</td>
                <td>
                    <button type="button" onClick={this._onClick}>
                        Hire
                    </button>
                </td>
                <td>{this.workerSymbols}</td>
            </tr>
        );
    }

    _onClick() {
        ResourceActions.hireWorker(this.props.resource);
    }

    _onChange() {
        this.setState(ResourceStore.getState(this.props.resource));
    }
}