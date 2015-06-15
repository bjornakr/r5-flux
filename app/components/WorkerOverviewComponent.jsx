import assign from 'object-assign';
import React from 'react';
import WorkerComponent from './WorkerComponent.jsx';
import ResourceConstants from '../constants/ResourceConstants.js';

export default class WorkerOverviewComponent extends React.Component {
    render() {
        let fieldSetStyle = {};
        assign(fieldSetStyle, this.props.styles.fieldSetStyle);

        return (
            <fieldset style={fieldSetStyle}>
                <legend style={this.props.styles.legendStyle}>Workers</legend>
                <table>
                    <WorkerComponent resource={ResourceConstants.Madera} />
                    <WorkerComponent resource={ResourceConstants.Stone} />
                </table>
            </fieldset>
        );
    }
}