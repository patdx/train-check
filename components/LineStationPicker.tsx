import React, { Component } from 'react';
import Pick from './Pick';
import { getLinesAsync, getStationsAsync } from '../services/lines-service';

export default class LineStationPicker extends Component<{
  match?: {
    params?: {
      line: any;
      station: any;
    };
    path: string;
  };
}> {
  render() {
    var selectedLine = this.props.match?.params?.line;
    var selectedStation = this.props.match?.params?.station;
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
