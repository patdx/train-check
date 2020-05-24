//example: https://www.train-guide.westjr.co.jp/api/v1/hokurikubiwako_st.json

import { NextApiRequest, NextApiResponse } from 'next';

function processData(result) {
  var stations = result.data.stations;

  var stationsNew = stations.map((station) => {
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

  console.log(stationsNew);
  return stationsNew;
}

export default function checkLine(req: NextApiRequest, _res: NextApiResponse) {
  const { lineName } = req.query;

  if (!lineName) {
    return Promise.reject('No line name specified');
  }

  var url = `https://www.train-guide.westjr.co.jp/api/v1/${lineName}_st.json`;

  console.log('Loading...');

  var result = fetch(url)
    .then((res) => res.json())
    .then(processData, () => console.log('something happened'));

  return result;
}

module.exports = checkLine;
