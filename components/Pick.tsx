import Head from 'next/head';
import Link from 'next/link';
import * as pathToRegexp from 'path-to-regexp';
import React, { FunctionComponent } from 'react';
import useSWR from 'swr';
import LoadingIcon from './LoadingIcon';
import { serializeError } from 'serialize-error';

export const Pick: FunctionComponent<{
  name: string;
  urlStyle: string;
  urlBaseParams?: any;
  urlKey: string;
  optionsAsync: () => Promise<any>;
  selectedId: string;
  enabled: boolean;
}> = ({
  name,
  urlStyle,
  urlBaseParams,
  urlKey,
  optionsAsync,
  selectedId,
  enabled,
}) => {
  // useSWR()
  const { data: options, error } = useSWR<any[]>(urlKey, optionsAsync);

  const loading = !options;

  if (error) {
    return <div>Error {JSON.stringify(serializeError(error))}</div>;
  }

  var urlFunc = urlStyle ? pathToRegexp.compile(urlStyle) : undefined;

  var makeUrl = function (itemName?: string) {
    var properties = urlBaseParams || {};
    properties[urlKey] = itemName;
    return urlFunc?.(properties);
  };

  const renderedOptions = options?.map((i) => (
    <Link href={makeUrl(i.id) ?? ''} key={i.id}>
      <a>
        <li>{i.text}</li>
      </a>
    </Link>
  ));

  if (!selectedId && enabled) {
    //Active Control
    if (loading) {
      return (
        <div>
          <h1 style={{ color: 'red' }}>{name}</h1>
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
          <h1 style={{ color: 'red' }}>{name}</h1>
          <ul>{renderedOptions}</ul>
        </div>
      );
    }
  } else if (!enabled) {
    //Disabled State
    return (
      <div>
        <h1 style={{ color: 'gray' }}>{name}</h1>
      </div>
    );
  } else {
    //Item has SelectedId
    if (loading) {
      return (
        <div>
          <h1>
            {name} <LoadingIcon />
          </h1>
        </div>
      );
    } else {
      const selectedName = selectedId
        ? options?.find((item) => item.id === selectedId)?.text
        : null;

      const titleHelmet = selectedName ? (
        <Head>
          <title>{selectedName}</title>
        </Head>
      ) : null;

      return (
        <div>
          <h1>
            {name}{' '}
            <Link href={makeUrl() ?? ''}>
              <a>{selectedName}</a>
            </Link>
            {titleHelmet}
          </h1>
        </div>
      );
    }
  }
};
