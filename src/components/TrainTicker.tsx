import React, { FC } from 'react';

export const TrainTicker: FC<{
  stationsAway: number;
}> = ({ stationsAway }) => {
  //show train distance from current station
  var rectPosition = 120 - stationsAway * 40;

  return (
    <svg viewBox="0 0 140 35" style={{ maxHeight: '1em' }}>
      <rect y="0" x={rectPosition} height="10" width="20" />
      <circle className="before" r="10" cy="25" cx="10" />
      <circle className="before" r="10" cy="25" cx="50" />
      <circle className="before" r="10" cy="25" cx="90" />
      <circle className="final" r="10" cy="25" cx="130" />
    </svg>
  );
};
