import React from 'react';
import ResourceStore from './../stores/ResourceStore.js';
import ItemStore from './../stores/ItemStore.js';
import Actions from './../actions/ResourceActions.js';

export default class ResourceNameAndCountComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = ResourceStore.getResource(this.props.resourceKey);
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        ResourceStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ResourceStore.removeChangeListener(this._onChange);
    }

    render() {
        return (
            <span>
                <strong>{this.state.name}</strong> {this.state.count.toFixed(1)}
            </span>
        );
    }

    _onChange() {
        this.setState(ResourceStore.getResource(this.props.resourceKey));
    }
}