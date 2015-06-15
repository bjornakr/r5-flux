import assign from 'object-assign';
import React from 'react';
import WorkerComponent from './WorkerComponent.jsx';
import ResourceConstants from '../constants/ResourceConstants.js';

export default class WorkersComponent extends React.Component {
    render() {
        //let items = ItemStore.getStoreItems();
        //let itemComponents = items.map((i, index) => {
        //    return <StoreItemComponent key={index} item={i} />
        //});

        let fieldSetStyle = {};
        assign(fieldSetStyle, this.props.styles.fieldSetStyle);

        return (
            <fieldset style={fieldSetStyle}>
                <legend style={this.props.styles.legendStyle}>Workers</legend>
                <table>
                    <WorkerComponent name="Lumberjack" price={50} resource={ResourceConstants.Madera} />
                </table>
            </fieldset>
        );
    }
}