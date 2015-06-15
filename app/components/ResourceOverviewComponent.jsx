import assign from 'object-assign';
import React from 'react';
import Resource from './ResourceComponent.jsx';
import ResourceMoneyComponent from './ResourceMoneyComponent.js';
import Constants from './../constants/ResourceConstants.js';

export default class ResourceOverviewComponent extends React.Component {

    render() {
        let fieldSetStyle = {}; //{background: "#D7E1E5"};
        assign(fieldSetStyle, this.props.styles.fieldSetStyle);

        return (
            <fieldset style={fieldSetStyle}>
                <legend style={this.props.styles.legendStyle}>Resources</legend>
                <table>
                    <ResourceMoneyComponent type={Constants.Dinero}/>
                    <Resource type={Constants.Madera} />
                    <Resource type={Constants.Stone} />
                </table>
            </fieldset>
        );
    }
}
