import React, { Component } from 'react';

export default class FontAwesome extends Component {
    render() {
        return <i className={"fa " + this.props.name} style={{ "verticalAlign": "middle" }} aria-hidden="true" />;
    }
}