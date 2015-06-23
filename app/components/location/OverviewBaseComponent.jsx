import React from 'react';

export default class LocationOverviewBaseComponent extends React.Component {

    getButtonStyle() {
        return {
            minHeight: 150,
            minWidth: 150,
            borderRadius: 10,
            color: "#FFFFFF",
            textShadow: "1px 1px 3px #333333",
            fontSize: 30
        }
    };
} 