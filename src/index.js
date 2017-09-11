import React, { Component } from 'react';
import { render } from 'react-dom';
import LineStationPicker from './components/LineStationPicker';
import StationInfo from './components/StationInfo';
import {Helmet} from "react-helmet";
import 'whatwg-fetch'; //use fetch polyfill
import 'font-awesome/css/font-awesome.css';
import 'normalize.css/normalize.css';
import './style.css';
import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <Helmet><title>TrainCheck</title></Helmet>
        <div className="nav">
          <div className="nav-container">
            <Link to="/"><img src={logo} style={{ maxWidth: "300px" }} alt={"TrainCheck"} /></Link>
          </div>
        </div>
        <div className="main-container">
          <Route path="/:line?/:station?" component={LineStationPicker} />
          <Route path="/:line/:station" component={StationInfo} />
        </div>
      </div>
    );
  }
}

render(<Router><App /></Router>, document.getElementById('root'));
