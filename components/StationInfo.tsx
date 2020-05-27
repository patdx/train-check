import React, { FunctionComponent } from 'react';
import { LoadingIcon } from './LoadingIcon';
import { Trains } from './Trains';
import { getTrainsAsync } from '../services/lines-service';
import useSWR from 'swr';

export const StationInfo: FunctionComponent<{
  line: any;
  station: any;
}> = ({ line, station }) => {
  const { data, error } = useSWR(JSON.stringify({ line, station }), () =>
    getTrainsAsync(line, station)
  );
  const loading = !data;

  if (error) {
    console.log('error', error);
    return <div>error occurred</div>;
  } else if (loading) {
    return <LoadingIcon />;
  } else {
    return (
      <div>
        <div className="card">
          <Trains name="Northbound" data={data?.trainsUp} />
        </div>
        <div className="card">
          <Trains name="Southbound" data={data?.trainsDown} />
        </div>
      </div>
    );
  }
};
