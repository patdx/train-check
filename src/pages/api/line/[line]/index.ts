//example: https://www.train-guide.westjr.co.jp/api/v1/hokurikubiwako_st.json

import ky from 'ky-universal';
import { NextApiRequest, NextApiResponse } from 'next';
import { StationsApi } from '../../../../interfaces/stations-api';

export default async function checkLine(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { line } = req.query;

  if (!line) {
    return Promise.reject('No line name specified');
  }

  const url = `https://www.train-guide.westjr.co.jp/api/v3/${line}_st.json`;

  console.log('Loading...');

  const data = await ky(url).json<StationsApi>();

  const stations = data.stations;

  const stationsNew = stations.map((station) => {
    var type;
    if (station.info.stopTrains == null) {
      type = 'other';
    } else {
      type = station.info.stopTrains.includes(1) ? 'rapid' : 'local';
    }

    return {
      name: station.info.name,
      code: station.info.code,
      type: type,
    };
  });

  return res.json(stationsNew);
}
