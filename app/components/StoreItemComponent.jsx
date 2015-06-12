import React from 'react';
import ResourceStore from './../stores/ResourceStore.js';
import ItemActions from './../actions/ItemActions.js';
import ResourceActions from './../actions/ResourceActions.js';
import Constants from './../constants/ResourceConstants.js';


export default class StoreItemComponent extends React.Component {

    constructor(props) {
        super(props);

        this.__onChange = this.__onChange.bind(this);
        this.__canAfford = this.__canAfford.bind(this);
        this.__onClick = this.__onClick.bind(this);
        this.item = this.props.item;
        this.state = {canAfford: this.__canAfford()};
    }


    componentDidMount() {
        ResourceStore.addChangeListener(this.__onChange);
    }

    componentWillUnmount() {
        ResourceStore.removeChangeListener(this.__onChange);
    }

    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td style={{textAlign: "right"}}>€{this.item.price.toFixed(2)}</td>
                <td>
                    <button type="button" disabled={!this.state.canAfford} onClick={this.__onClick}>
                        Buy
                    </button>
                </td>
            </tr>
        );
    }

    __onClick() {
        ResourceActions.buyItem(this.item)
    }

    __canAfford() {
        return ResourceStore.getResource(Constants.Dinero).count >= this.item.price;
    }

    __onChange() {
        if (this.__canAfford() && !this.state.canAfford) {
            this.setState({canAfford: true});
        }
        else if (!this.__canAfford() && this.state.canAfford) {
            this.setState({canAfford: false});
        }
    }
}

//StoreItemComponent.propTypes = {
//    item: React.PropTypes.object.isRequired(),
//    ruru: React.PropTypes.string.isRequired()
//};
//StoreItemComponent.defaultProps = { ruru: 0 };