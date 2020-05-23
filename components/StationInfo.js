import React, { Component } from 'react';
import * as linesAPI from '../modules/linesAPI';
import LoadingIcon from './LoadingIcon';
import Trains from './Trains';

export default class StationInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            data: null
        }
        this.handleData = this.handleData.bind(this);

        const params = props.match.params;
        linesAPI.getTrainsAsync(params.line, params.station).then(this.handleData);
    }
    handleData(data) {
        console.log("data", data);
        this.setState({ loading: false, data: data });
    }

    render() {
        const data = this.state.data;

        if (data) {
            return (
                <div>
                    <div className="card">
                        <Trains name="Northbound" data={this.state.data.trainsUp} />
                    </div>
                    <div className="card">
                        <Trains name="Southbound" data={this.state.data.trainsDown} />
                    </div>
                </div>
            )
        } else {
            return <LoadingIcon />;
        }
    }
}