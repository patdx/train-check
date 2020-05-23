import React, { Component } from 'react';
import Link from 'next/link';
import * as pathToRegexp from 'path-to-regexp';
import LoadingIcon from './LoadingIcon';
import _ from 'lodash';
import Head from 'next/head';

export default class Pick extends Component<
  {
    urlStyle: string;
    [key: string]: any;
  },
  {
    loading: boolean;
    options: any[];
  }
> {
  constructor(props) {
    super(props);
    this.loadOptions = this.loadOptions.bind(this);

    if (props.optionsAsync) {
      props.optionsAsync.then(this.loadOptions);
      this.state = {
        loading: true,
        options: [],
      };
    } else {
      this.state = {
        loading: false,
        options: [],
      };
    }
  }

  loadOptions(data) {
    this.setState({
      loading: false,
      options: data,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: true,
      options: [],
    });
    nextProps.optionsAsync.then(this.loadOptions);
  }

  render() {
    const reactProps = this.props;
    var urlFunc = this.props.urlStyle
      ? pathToRegexp.compile(this.props.urlStyle)
      : undefined;
    var makeUrl = function (itemName?: string) {
      var properties = reactProps.urlBaseParams || {};
      properties[reactProps.urlKey] = itemName;
      return urlFunc?.(properties);
    };

    var optionRender = (i) => (
      <Link href={makeUrl(i.id) ?? ''} key={i.id}>
        <a>
          <li>{i.text}</li>
        </a>
      </Link>
    );
    var options = this.state.options.map(optionRender);

    if (!this.props.selectedId && this.props.enabled) {
      //Active Control
      if (this.state.loading) {
        return (
          <div>
            <h1 style={{ color: 'red' }}>{this.props.name}</h1>
            <ul>
              <li>
                <LoadingIcon />
              </li>
            </ul>
          </div>
        );
      } else {
        return (
          <div>
            <h1 style={{ color: 'red' }}>{this.props.name}</h1>
            <ul>{options}</ul>
          </div>
        );
      }
    } else if (!this.props.enabled) {
      //Disabled State
      return (
        <div>
          <h1 style={{ color: 'gray' }}>{this.props.name}</h1>
        </div>
      );
    } else {
      //Item has SelectedId
      if (this.state.loading) {
        return (
          <div>
            <h1>
              {this.props.name} <LoadingIcon />
            </h1>
          </div>
        );
      } else {
        const selectedName = this.props.selectedId
          ? _.find(this.state.options, { id: this.props.selectedId }).text
          : null;
        const titleHelmet = selectedName ? (
          <Head>
            <title>{selectedName}</title>
          </Head>
        ) : null;

        return (
          <div>
            <h1>
              {this.props.name}{' '}
              <Link href={makeUrl() ?? ''}>
                <a>{selectedName}</a>
              </Link>
              {titleHelmet}
            </h1>
          </div>
        );
      }
    }
  }
}
