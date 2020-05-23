import React, { Component } from 'react';
import FontAwesome from './FontAwesome';

export default class LoadingIcon extends Component {
  render() {
    return <FontAwesome name="fa-spinner fa-pulse fa-fw" />;
  }
}
