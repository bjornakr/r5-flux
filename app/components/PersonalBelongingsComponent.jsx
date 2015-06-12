import assign from 'object-assign';
import React from 'react';
import ItemStore from '../stores/ItemStore.js';

export default class PersonalBelongingsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: ItemStore.getPersonalBelongings()
        };

        this.__onChange = this.__onChange.bind(this);

    }

    componentDidMount() {
        ItemStore.addChangeListener(this.__onChange)
    }

    componentWillUnmount() {
        ItemStore.removeChangeListener(this.__onChange);
    }

    render() {
        let itemListItems = this.state.items.map((i, index) => {
            return <li key={index}>{i.name}</li>
        });

        let fieldSetStyle = {}; //{background: "#E2D5BE"};
        assign(fieldSetStyle, this.props.styles.fieldSetStyle);

        return (
            <fieldset style={fieldSetStyle}>
                <legend style={this.props.styles.legendStyle}>Personal belongings</legend>
                {itemListItems}
            </fieldset>
        );
    }

    __onChange() {
        this.setState({items: ItemStore.getPersonalBelongings()});
    }
} 