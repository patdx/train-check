//example: https://www.train-guide.westjr.co.jp/api/v1/hokurikubiwako_st.json

import { NextApiRequest, NextApiResponse } from 'next';
import { StationsApi } from '../../../../interfaces/stations-api';
import { fetchJson } from '../../../../utils/fetch-json';
import {firstValueFrom} from "rxjs";

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

  const data = await firstValueFrom(fetchJson<StationsApi>(url));

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
