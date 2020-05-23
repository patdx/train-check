import React, { Component } from 'react';
import Train from './Train';
import { TrainModel } from '../interfaces/train-model';

export default class Trains extends Component<{
  name: string;
  data: TrainModel[]
}> {
  render() {
    var trains = this.props.data.map(function (train) {
      return <Train data={train} key={train.no} />;
    });

    return (
      <div>
        <h1>{this.props.name}</h1>
        <table className="table">
          <tbody>{trains}</tbody>
        </table>
        {this.props.data.length === 0 ? 'No trains' : null}
      </div>
    );
  }
}
