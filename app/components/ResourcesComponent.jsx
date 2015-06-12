import assign from 'object-assign';
import React from 'react';
import Resource from './ResourceComponent.jsx';
import ResourceMoneyComponent from './ResourceMoneyComponent.js';
import Constants from './../constants/ResourceConstants.js';
import Actions from './../actions/ResourceActions.js';
import ResourceStore from './../stores/ResourceStore.js';
import { addons } from '../../node_modules/react/addons';

export default class ResourcesComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {canSellMadera: false}
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        ResourceStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ResourceStore.removeChangeListener(this._onChange);
    }

    render() {
        let fieldSetStyle = {}; //{background: "#D7E1E5"};
        assign(fieldSetStyle, this.props.styles.fieldSetStyle);

        return (
            <fieldset style={fieldSetStyle}>
                <legend style={this.props.styles.legendStyle}>Resources</legend>
                <table>
                    <tr>
                        <ResourceMoneyComponent type={Constants.Dinero}/>
                    </tr>
                    <tr>
                        <Resource type={Constants.Madera}/><br />
                    </tr>
                </table>
            </fieldset>
        );
    }

    _onChange() {
        if (ResourceStore.getResource(Constants.Madera) > 0 && !this.state.canSellMadera) {
            this.setState({canSellMadera: true});
        }
        else if (ResourceStore.getResource(Constants.Madera) <= 0 && this.state.canSellMadera) {
            this.setState({canSellMadera: false});
        }
    }
}
