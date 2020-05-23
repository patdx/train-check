import React, { Component } from 'react';
import * as linesAPI from '../modules/linesAPI';
import Pick from './Pick';

export default class LineStationPicker extends Component {
  render() {
    var selectedLine = this.props.match.params.line;
    var selectedStation = this.props.match.params.station;
    var urlStyle = this.props.match.path;

    return (
      <div>
        <div className="card">
          <Pick
            name="Line"
            urlStyle={urlStyle}
            urlKey={'line'}
            optionsAsync={linesAPI.getLinesAsync()}
            selectedId={selectedLine}
            enabled={true}
          />
        </div>
        <div className="card">
          <Pick
            name="Station"
            urlStyle={urlStyle}
            urlBaseParams={{ line: selectedLine }}
            urlKey={'station'}
            optionsAsync={linesAPI.getStationsAsync(selectedLine)}
            selectedId={selectedStation}
            enabled={selectedLine ? true : false}
          />
        </div>
      </div>
    );
  }
}
