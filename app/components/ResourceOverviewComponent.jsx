import assign from 'object-assign';
import React from 'react';
//import Resource from './ResourceComponent.jsx';
//import ResourceMoneyComponent from './ResourceMoneyComponent.js';
import Constants from './../constants/ResourceConstants.js';
import ResourceNameAndCountComponent from './ResourceNameAndCountComponent.jsx';

export default class ResourceOverviewComponent extends React.Component {

    render() {
        let fieldSetStyle = {}; //{background: "#D7E1E5"};
        assign(fieldSetStyle, this.props.styles.fieldSetStyle);
        let liStyle = {
            display: "inline",
            listStyleType: "none",
            marginRight: 10

        };

        return (
            <fieldset style={fieldSetStyle}>
                <legend style={this.props.styles.legendStyle}>Resources</legend>
                <ul style={{
                    paddingLeft: 0
                }}>
                    <li style={liStyle}><ResourceNameAndCountComponent resourceKey={Constants.Dinero}/></li>
                    <li style={liStyle}><ResourceNameAndCountComponent resourceKey={Constants.Madera}/></li>
                    <li style={liStyle}><ResourceNameAndCountComponent resourceKey={Constants.Stone}/></li>
                </ul>
            </fieldset>
        );
    }
}
