import React from 'react';
import PersonalBelongings from './PersonalBelongingsComponent.jsx';
import ResourceOverview from './ResourceOverviewComponent.jsx';
import Store from './StoreComponent.jsx';
import Workers from './WorkerOverviewComponent.jsx';
import Location from './LocationComponent.jsx';
import LocationOverview from './LocationOverviewComponent.jsx';
import LocationRouter from './LocationRouterComponent.jsx';

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
                <ResourceOverview styles = {styles} />
                <LocationRouter />
            </div>
        );
    }
}
//<div>
//    <PersonalBelongings styles = {styles} />
//    <ResourceOverview styles = {styles} />
//    <Store styles = {styles} />
//    <Workers styles = {styles} />
//    <Location />
//</div>