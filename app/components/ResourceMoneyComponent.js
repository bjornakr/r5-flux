import React from 'react';
import ResourceComponent from './ResourceComponent.jsx';

export default class ResourceMoneyComponent extends ResourceComponent {
    render() {
        return (
        <tr>
            <td>{this.resource.name}</td>
            <td>€{this.resource.count.toFixed(2)}</td>
        </tr>
        );
    }
}
