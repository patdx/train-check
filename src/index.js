import React, { Component } from 'react';
import { render } from 'react-dom';
import LineStationPicker from './components/LineStationPicker';
import 'whatwg-fetch'; //use fetch polyfill
import './style.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Route path="/:line?/:station?" component={LineStationPicker} />
        <Route path="/:line/:station" render={(props) =>
          <h1>Chosen: {props.match.params.line}線 {props.match.params.station}駅</h1>} />
      </div>
    );
  }
}

render(<Router><App /></Router>, document.getElementById('root'));
