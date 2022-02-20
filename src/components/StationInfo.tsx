import React, { FunctionComponent } from 'react';
import { LoadingIcon } from './LoadingIcon';
import { Trains } from './Trains';
import { getTrainsAsync } from '../services/lines-service';
import useSWR from 'swr';
import { Card } from './Card';

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
        <Card>
          <Trains name="Northbound" data={data?.trainsUp} />
        </Card>
        <Card>
          <Trains name="Southbound" data={data?.trainsDown} />
        </Card>
      </div>
    );
  }
};
