import React, { Component } from 'react';
import Pick from './Pick';
import { getLinesAsync, getStationsAsync } from '../services/lines-service';

export default class LineStationPicker extends Component<{
  line: any;
  station: any;

  match?: {
    path: string;
  };
}> {
  render() {
    var selectedLine = this.props.line;
    var selectedStation = this.props.station;
    var urlStyle = this.props.match?.path;

    return (
      <div>
        <div className="card">
          <Pick
            name="Line"
            urlStyle={urlStyle ?? ''}
            urlKey={'line'}
            optionsAsync={getLinesAsync()}
            selectedId={selectedLine}
            enabled={true}
          />
        </div>
        <div className="card">
          <Pick
            name="Station"
            urlStyle={urlStyle ?? ''}
            urlBaseParams={{ line: selectedLine }}
            urlKey={'station'}
            optionsAsync={getStationsAsync(selectedLine)}
            selectedId={selectedStation}
            enabled={selectedLine ? true : false}
          />
        </div>
      </div>
    );
  }
}
