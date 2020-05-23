import React, { Component } from 'react';
import Train from './Train';

export default class Trains extends Component {
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
