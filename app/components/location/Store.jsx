import assign from 'object-assign';
import React from 'react';
import StoreItemComponent from '../StoreItemComponent.jsx';
import ItemStore from '../../stores/ItemStore.js';
import LeaveBehavior from './LeaveBehavior.js';

export default class Store extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.locationKey);
        this.leaveBehavior = new LeaveBehavior(props.locationKey);
    }

    render() {
        let items = ItemStore.getStoreItems();
        let itemComponents = items.map((i, index) => {
            return <StoreItemComponent key={index} item={i} />
        });

        //let fieldSetStyle = {}; // {background: "#DDECDA"};
        //assign(fieldSetStyle, this.props.styles.fieldSetStyle);

        return (
            <fieldset>
                <legend>Boutique</legend>
                <table>
                    {itemComponents}
                </table>
                <p>{this.leaveBehavior.leaveButton}</p>
            </fieldset>
        );
    }
}