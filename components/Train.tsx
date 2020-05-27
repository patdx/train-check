import React, { FC } from 'react';
import { TrainTicker } from './TrainTicker';
import { TrainModel } from '../interfaces/train-model';

export const Train: FC<{
  data: TrainModel;
}> = ({ data }) => {
  const train = data;

  return (
    <tr>
      <td>
        {train.type} to {train.boundFor}
      </td>
      <td>{train.delayStatus}</td>
      <td>{train.nowPosition}</td>
      <td>
        <TrainTicker stationsAway={Number(data.stationsAway)} />
      </td>
    </tr>
  );
};
