import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import _ from 'lodash';

export default class Pick extends Component {
  constructor(props) {
    super(props);
    this.loadOptions = this.loadOptions.bind(this);

    if (props.optionsAsync) {
      props.optionsAsync.then(this.loadOptions);
      this.state = {
        loading: true,
        options: []
      }
    } else {
      this.state = {
        loading: false,
        options: []
      }
    }
  }

  loadOptions(data) {
    this.setState({
      loading: false,
      options: data
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: true,
      options: []
    });
    nextProps.optionsAsync.then(this.loadOptions);
  }


  render() {
    const reactProps = this.props;
    var urlFunc = pathToRegexp.compile(this.props.urlStyle);
    var makeUrl = function (itemName) {
      var properties = reactProps.urlBaseParams || {};
      properties[reactProps.urlKey] = itemName;
      return urlFunc(properties);
    }

    var optionRender = (i) => <Link to={makeUrl(i.id)} key={i.id}><li>{i.text}</li></Link>;
    var options = this.state.options.map(optionRender);

    const ulStyle = { columnCount: 3, listStyleType: "none" };

    if (!this.props.selectedId && this.props.enabled) {
      //Active Control
      if (this.state.loading) {
        return <div><h1 style={{ color: "red" }}>{this.props.name}</h1><ul style={ulStyle}><li>Loading...</li></ul></div>
      } else {
        return (
          <div><h1 style={{ color: "red" }}>{this.props.name}</h1><ul style={ulStyle}>{options}</ul></div>
        )
      }
    } else {
      //Item is Selected
      if (this.state.loading) {
        return (
          <div><h1>{this.props.name}</h1></div>
        )
      } else {
        var selectedName = (this.props.selectedId) ? _.find(this.state.options,{id: this.props.selectedId}).text : null;

        return (
          <div><h1>{this.props.name} <Link to={makeUrl()}>{selectedName}</Link></h1></div>
        )
      }
    }
  }
}
