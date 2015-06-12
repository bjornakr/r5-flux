import React from 'react';
import PersonalBelongings from './PersonalBelongingsComponent.jsx';
import Resources from './ResourcesComponent.jsx';
import Store from './StoreComponent.jsx';

export default class AppComponent extends React.Component {

    render() {
        let styles = {
            legendStyle: {
                background: "#333333",
                color: "#EEEEEE",
                minWidth: 200,
                paddingLeft: 10,
                paddingTop: 5,
                paddingBottom: 5
            },
            fieldSetStyle: {
                background: "#EEEEEE",
                color: "#222222",
                marginBottom: 20
            }
        };
        return (
            <div>
                <PersonalBelongings styles = {styles} />
                <Resources styles = {styles} />
                <Store styles = {styles} />
            </div>
        );
    }
}