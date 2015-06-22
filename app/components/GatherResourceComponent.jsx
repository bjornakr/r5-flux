import React from 'react';
import LocationActions from '../actions/LocationActions.js';
import ResourceActions from '../actions/ResourceActions.js';
import ResourceNameAndCountComponent from './ResourceNameAndCountComponent.jsx';
import LocationStore from '../stores/LocationStore.js';
import ResourceStore from '../stores/ResourceStore.js';
import ItemStore from '../stores/ItemStore.js';

export default class GatherResourceComponent extends React.Component {

    constructor(props) {
        super(props);
        this.location = LocationStore.getLocation(this.props.locationKey);
        this.resource = ResourceStore.getResource(this.location.resourceKey);
        this.tool = ItemStore.getToolForResource(this.location.resourceKey);
        this._leave = this._leave.bind(this);
        this._gather = this._gather.bind(this);
        //this._onChange = this._onChange.bind(this);
    }

    //componentDidMount() {
    //    ResourceStore.addChangeListener(this._onChange);
    //}
    //
    //componentWillUnmount() {
    //    ResourceStore.removeChangeListener(this._onChange);
    //}


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
            <fieldset style={{ textAlign: "center", height: 200 }}>
                <legend><h1>{this.location.name}</h1></legend>
                <ResourceNameAndCountComponent resourceKey={this.location.resourceKey}/>
                <p><button onClick={this._gather} style={chopButtonStyle}>{this.resource.gatherVerb}!</button></p>
                <p><button onClick={this._leave}>Leave</button></p>
            </fieldset>
        );
    }

    _leave() {
        LocationActions.leaveLocation(this.props.locationKey);
    };

    _gather() {
        ResourceActions.gatherResource(this.location.resourceKey, this.tool);
    };

    //_onChange() {
    //
    //};
}
