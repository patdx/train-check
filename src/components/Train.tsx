import React, { FC } from 'react';
import { TrainTicker } from './TrainTicker';
import { TrainModel } from '../interfaces/train-model';

export const Train: FC<{
  data: TrainModel;
}> = ({ data }) => {
  const train = data;

  return (
    <tr>
      <td className="w-1/4 text-center">
        {train.type} to {train.boundFor}
      </td>
      <td className="w-1/4 text-center">{train.delayStatus}</td>
      <td className="w-1/4 text-center">{train.nowPosition}</td>
      <td className="w-1/4 text-center">
        <TrainTicker stationsAway={Number(data.stationsAway)} />
      </td>
    </tr>
  );
};
