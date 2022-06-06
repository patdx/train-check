import Head from 'next/head';
import Link from 'next/link';
import React, { FunctionComponent, Children, ReactNode } from 'react';
// import urlJoin from 'url-join';
import { LoadingIcon } from './LoadingIcon';

export const Pick: FunctionComponent<{
  name: string;
  selectedId: string;
  selectedName?: string;
  enabled: boolean;
  unselectHref?: string;
  children?: ReactNode
}> = ({
  name,
  selectedId,
  selectedName,
  enabled,
  children,
  unselectHref = '/',
}) => {
  const loading = !children || Children.count(children) === 0;

  // const renderedOptions =

  if (selectedId && enabled) {
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
      const titleHelmet = selectedName ? (
        <Head>
          <title>{selectedName}</title>
        </Head>
      ) : null;

      return (
        <div>
          <h1>
            {name}{' '}
            <Link href={unselectHref}>
              <a>{selectedName}</a>
            </Link>
            {titleHelmet}
          </h1>
        </div>
      );
    }
  } else if (!selectedId && enabled) {
    // Active Control
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
          <h1 className="text-red-700">{name}</h1>
          <ul className="grid grid-cols-2 gap-2">{children}</ul>
        </div>
      );
    }
  } else {
    // Disabled State
    return (
      <div>
        <h1 className="text-gray-500">{name}</h1>
      </div>
    );
  }
};
