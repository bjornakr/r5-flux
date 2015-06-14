import React from 'react';
import ResourceStore from './../stores/ResourceStore.js';
import ItemStore from './../stores/ItemStore.js';
import Actions from './../actions/ResourceActions.js';

export default class ResourceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.resource = ResourceStore.getResource(this.props.type);
        //this.state = this._getState();
        this._onChange = this._onChange.bind(this);
        this._sell = this._sell.bind(this);
        this._gather = this._gather.bind(this);
    }

    //_getState() {
    //    let resourceCount = this.props.resource.count;
    //    return ({
    //        count: resourceCount,
    //        canSell: resourceCount > 0
    //    });
    //}

    componentDidMount() {
        ResourceStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ResourceStore.removeChangeListener(this._onChange);
    }

    render() {
        let resource = this.resource;

        return (
            <tr>
                <td>{this.resource.name}</td>
                <td>{this.resource.count.toFixed(1)}</td>
                <td>
                    <button type="button" onClick={this._gather}>Chop</button>
                    <button type="button" onClick={this._sell} disabled={resource.count <= 0}>Sell</button>
                </td>
            </tr>
        );
    }

    _gather() {
        let resourceType = this.props.type;
        Actions.gatherResource(resourceType, ItemStore.getToolForResource(this.props.type))
    }

    _sell() {
        Actions.sellMadera();
    }

    _onChange() {
        this.forceUpdate();
    }
}