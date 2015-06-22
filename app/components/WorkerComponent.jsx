import React from 'react';
import ResourceActions from '../actions/ResourceActions.js';
import ResourceStore from '../stores/ResourceStore.js';

export default class WorkerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = ResourceStore.getStateForResource(this.props.resourceKey);
        this._onClick = this._onClick.bind(this);

        console.log(this.workerSymbols);
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        ResourceStore.addWorkerChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ResourceStore.removeWorkerChangeListener(this._onChange);
    }

    render() {
        this.workerSymbols = "";
        _.each(_.range(this.state.workers.hiredCount), () => {
            this.workerSymbols += "♟";
        });

        console.log(this.state.canBuyWorker);
        return (
            <tr>
                <td>{this.state.workers.name}</td>
                <td style={{textAlign: "right"}}>€{this.state.workers.price}</td>
                <td>
                    <button type="button" onClick={this._onClick}
                        disabled={!this.state.canBuyWorker}>
                        Hire
                    </button>
                </td>
                <td dangerouslySetInnerHTML={{__html: prettyPrintWorkers(this.state.workers.hiredCount)}}></td>
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

let prettyPrintWorkers = (workerCount, level = 1) => {
    if (workerCount <= 0) {
        return "";
    }
    else if (workerCount % 10 > 0) {
        if (level === 1) {
            return prettyPrintWorkers(workerCount - 1, level) + "♙";
        }
        else {
            return prettyPrintWorkers(workerCount - 1, level).concat("♟<sub>" + (Math.pow(10, level-1)) + "</sub>");
        }
    }
    else {
        return prettyPrintWorkers(workerCount / 10, level+1);
    }
};
