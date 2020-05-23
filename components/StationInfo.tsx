import React, { Component } from 'react';
import LoadingIcon from './LoadingIcon';
import Trains from './Trains';
import { getTrainsAsync } from '../services/lines-service';

export default class StationInfo extends Component<
  {
    match?: {
      params?: any;
    }
  },
  {
    loading: boolean;
    data?: {
      trainsUp: any;
      trainsDown: any;
    };
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: undefined,
    };
    this.handleData = this.handleData.bind(this);

    const params = props.match?.params;
    getTrainsAsync(params?.line, params?.station).then(this.handleData);
  }
  handleData(data) {
    console.log('data', data);
    this.setState({ loading: false, data: data });
  }

  render() {
    const data = this.state.data;

    if (data) {
      return (
        <div>
          <div className="card">
            <Trains name="Northbound" data={this.state.data?.trainsUp} />
          </div>
          <div className="card">
            <Trains name="Southbound" data={this.state.data?.trainsDown} />
          </div>
        </div>
      );
    } else {
      return <LoadingIcon />;
    }
  }
}
