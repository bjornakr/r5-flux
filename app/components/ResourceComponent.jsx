import React from 'react';
import ResourceStore from './../stores/ResourceStore.js';
import ItemStore from './../stores/ItemStore.js';
import Actions from './../actions/ResourceActions.js';

export default class ResourceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.resource = ResourceStore.getResource(this.props.resourceKey);
        this._onChange = this._onChange.bind(this);
        this._sell = this._sell.bind(this);
        this._gather = this._gather.bind(this);
    }

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
                    <button type="button" style={{ minWidth: 80, marginRight: 5 }}
                            onClick={this._gather}>{this.resource.gatherVerb}</button>
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
        Actions.sell(this.props.type);
    }

    _onChange() {
        this.setState(ResourceStore.getState());
    }
}