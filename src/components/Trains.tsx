import React, { FC } from 'react';
import { Train } from './Train';
import { TrainModel } from '../interfaces/train-model';

export const Trains: FC<{
  name: string;
  data: TrainModel[];
}> = ({ name, data }) => {
  var trains = data.map((train) => {
    return <Train data={train} key={train.no} />;
  });

  return (
    <div>
      <h1>{name}</h1>
      <table className="table">
        <tbody>{trains}</tbody>
      </table>
      {data.length === 0 ? 'No trains' : null}
    </div>
  );
};
