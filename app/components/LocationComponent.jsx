import React from 'react';

export default class LocationComponent extends React.Component {

    render() {
        let chopButtonStyle = {
            minHeight: 50,
            minWidth: 100,
            borderRadius: 5,
            color: "#FBFBFB",
            backgroundColor: "#3D6E97",
            //fontStyle: "italic",
            fontSize: 20
        };

        return (
            <fieldset style={{ textAlign: "center" }}>
                <legend><h1>Forest</h1></legend>
                <p><strong>Madera</strong> 3 587 789</p>
                <p><button style={chopButtonStyle}>Chop!</button></p>
                <p><button>Leave</button></p>
            </fieldset>
        );
    }
}
