import React, { Component } from 'react';
import { Pick } from './Pick';
import { getLinesAsync, getStationsAsync } from '../services/lines-service';

export default class LineStationPicker extends Component<{
  line: any;
  station: any;
}> {
  render() {
    var selectedLine = this.props.line;
    var selectedStation = this.props.station;

    return (
      <div>
        <div className="card">
          <Pick
            name="Line"
            // urlStyle={urlStyle ?? ''}
            urlStyle="test"
            urlKey={'line'}
            optionsAsync={() => getLinesAsync()}
            selectedId={selectedLine}
            enabled={true}
          />
        </div>

        <div className="card">
          {/* // urlStyle={urlStyle ?? ''} */}
          <Pick
            name="Station"
            urlStyle=""
            urlBaseParams={{ line: selectedLine }}
            urlKey={'station'}
            optionsAsync={() => getStationsAsync(selectedLine)}
            selectedId={selectedStation}
            enabled={selectedLine ? true : false}
          />
        </div>
      </div>
    );
  }
}
