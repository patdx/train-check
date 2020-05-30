import Head from 'next/head';
import Link from 'next/link';
import React, { FunctionComponent, Children } from 'react';
// import urlJoin from 'url-join';
import { LoadingIcon } from './LoadingIcon';

export const Pick: FunctionComponent<{
  name: string;
  // options?: any[];
  selectedId: string;
  enabled: boolean;
}> = ({ name, selectedId, enabled, children }) => {
  const loading = !children || Children.count(children) === 0;

  // const renderedOptions =

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
          <ul>{children}</ul>
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
      const selectedName = undefined;
      // const selectedName = selectedId
      //   ? options?.find((item) => item.id === selectedId)?.text
      //   : null;

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
