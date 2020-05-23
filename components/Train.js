import React, { Component } from 'react';
import TrainTicker from './TrainTicker';

export default class Train extends Component {
  render() {
    var train = this.props.data;

    return (
      <tr>
        <td>
          {train.type} to {train.boundFor}
        </td>
        <td>{train.delayStatus}</td>
        <td>{train.nowPosition}</td>
        <td>
          <TrainTicker stationsAway={this.props.data.stationsAway} />
        </td>
      </tr>
    );
  }
}
