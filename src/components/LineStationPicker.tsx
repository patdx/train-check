import React, { FC } from 'react';
import { Pick } from './Pick';
import { getLinesAsync, getStationsAsync } from '../services/lines-service';
import useSWR from 'swr';
import { serializeError } from 'serialize-error';
import Link from 'next/link';
import urlJoin from 'url-join';
import { Card } from './Card';

export const LineStationPicker: FC<{
  line: string;
  station: string;
}> = ({ line, station }) => {
  const resultLines = useSWR('lines', getLinesAsync);

  if (resultLines.error) {
    return <div>Error {JSON.stringify(serializeError(resultLines.error))}</div>;
  }

  const resultStations = useSWR(
    line ?? null,
    (line) => getStationsAsync(line),
    {}
  );

  return (
    <div>
      <Card>
        <Pick
          name="Line"
          selectedId={line}
          selectedName={
            resultLines.data?.find((item) => item.id === line)?.text
          }
          enabled={true}
        >
          {resultLines.data?.map((option) => (
            <li key={option.id}>
              <Link
                className="text-blue-800"
                href="/[line]"
                as={urlJoin('/', option.id)}
              >
                {option.text}
              </Link>
            </li>
          ))}
        </Pick>
      </Card>

      <Card>
        {Boolean(resultStations.error) && (
          <div>
            Error {JSON.stringify(serializeError(resultStations.error))}
          </div>
        )}
        <Pick
          name="Station"
          selectedId={station}
          selectedName={
            resultStations.data?.find((item) => item.id === station)?.text
          }
          enabled={line ? true : false}
          unselectHref={`/${line}`}
        >
          {resultStations.data?.map((option) => (
            <li key={option.id}>
              <Link
                className="text-blue-800"
                href="/[line]/[station]"
                as={urlJoin('/', line, option.id)}
              >
                {option.text}
              </Link>
            </li>
          ))}
        </Pick>
      </Card>
    </div>
  );
};
