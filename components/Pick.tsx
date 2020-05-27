import Head from 'next/head';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import urlJoin from 'url-join';
import { LoadingIcon } from './LoadingIcon';

export const Pick: FunctionComponent<{
  name: string;
  options?: any[];
  selectedId: string;
  enabled: boolean;
}> = ({ name, options, selectedId, enabled }) => {
  const loading = !options;

  const renderedOptions = options?.map((option) => (
    <Link href="/[line]" as={urlJoin('/', option.id)} key={option.id}>
      <a>
        <li>{option.text}</li>
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
            <Link href="/">
              <a>{selectedName}</a>
            </Link>
            {titleHelmet}
          </h1>
        </div>
      );
    }
  }
};
