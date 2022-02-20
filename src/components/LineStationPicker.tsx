import React, { FC } from 'react';
import { Pick } from './Pick';
import { getLinesAsync, getStationsAsync } from '../services/lines-service';
import useSWR from 'swr';
import { serializeError } from 'serialize-error';
import Link from 'next/link';
import urlJoin from 'url-join';
import { Card } from './Card';

export const LineStationPicker: FC<{
  line: any;
  station: any;
}> = ({ line, station }) => {
  const lineData = useSWR<any[]>('lines', getLinesAsync);

  if (lineData.error) {
    return <div>Error {JSON.stringify(serializeError(lineData.error))}</div>;
  }

  const stationData = useSWR<any[]>(
    line,
    (line) => line && getStationsAsync(line),
    {}
  );

  return (
    <div>
      {/* <pre>{JSON.stringify({ line, station })}</pre> */}

      <Card>
        <Pick
          name="Line"
          // options={lineData.data}
          selectedId={line}
          enabled={true}
        >
          {lineData.data?.map((option) => (
            <li key={option.id}>
              <Link href="/[line]" as={urlJoin('/', option.id)}>
                <a>{option.text}</a>
              </Link>
            </li>
          ))}
        </Pick>
      </Card>

      <Card>
        {Boolean(stationData.error) && (
          <div>Error {JSON.stringify(serializeError(stationData.error))}</div>
        )}
        <Pick name="Station" selectedId={station} enabled={line ? true : false}>
          {stationData.data?.map((option) => (
            <li key={option.id}>
              <Link href="/[line]/[station]" as={urlJoin('/', line, option.id)}>
                <a>{option.text}</a>
              </Link>
            </li>
          ))}
        </Pick>
      </Card>
    </div>
  );
};
