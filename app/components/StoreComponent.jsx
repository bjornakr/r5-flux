import assign from 'object-assign';
import React from 'react';
import StoreItemComponent from './StoreItemComponent.jsx';
import ItemStore from './../stores/ItemStore.js';

export default class StoreComponent extends React.Component {

    render() {
        let items = ItemStore.getStoreItems();
        let itemComponents = items.map((i, index) => {
            return <StoreItemComponent key={index} item={i} />
        });

        let fieldSetStyle = {}; // {background: "#DDECDA"};
        assign(fieldSetStyle, this.props.styles.fieldSetStyle);

        return (
            <fieldset style={fieldSetStyle}>
                <legend style={this.props.styles.legendStyle}>Boutique</legend>
                <table>
                    {itemComponents}
                </table>
            </fieldset>
        );
    }
}