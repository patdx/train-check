import { Hono } from 'hono';
import ky from 'ky';
import type { StationsApi } from '../src/types/stations-api';
import type { TrainsApi } from '../src/types/trains-api';

const app = new Hono();
const westJrApi = ky.create({
  headers: {
    Accept: 'application/json, text/plain, */*',
    Referer: 'https://www.train-guide.westjr.co.jp/',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  },
  throwHttpErrors: false,
});

// CORS middleware
app.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type');
  if (c.req.method === 'OPTIONS') {
    return c.body(null, 204);
  }
  await next();
});

const DIRECTION = {
  UP: 0,
  DOWN: 1,
};

const STOPTRAINS = {
  //for the station
  1: 'Special Rapid',
  2: 'Local',
};

function getTrainDelays(
  stations: StationsApi['stations'],
  trains: TrainsApi['trains'],
  stationCode: string
) {
  type StationLike = StationsApi['stations'][number] | { info: { name: string } };
  type TrainWithComputed = {
    position: string[];
    displayType: string;
    type: string;
    direction: number;
    delayMinutes: number;
    delayStatus: string;
    dest: TrainsApi['trains'][number]['dest'];
    no: string;
    original: TrainsApi['trains'][number];
    goingFrom: string;
    goingFromIndex: number | null;
    goingFromStation: StationsApi['stations'][number] | undefined;
    arrivingAt: string;
    arrivingAtIndex: number;
    arrivingAtStation: StationLike | undefined;
    isGoing: boolean;
    nowPosition: string;
    stationsAway: number;
  };
  //Main Processing

  //Stations Prep
  function findStationFromCode(code: string) {
    return function (station: StationsApi['stations'][0]) {
      return station.info.code == code;
    };
  }

  function getStationCode(station: StationsApi['stations'][0]) {
    return station.info.code;
  }

  const myStationIndex = stations.findIndex(findStationFromCode(stationCode));

  if (myStationIndex == -1) {
    throw 'Station ' + stationCode + " doesn't exist.";
  }

  const myStation = stations[myStationIndex];
  if (!myStation) {
    throw new Error(`Station ${stationCode} doesn't exist.`);
  }
  const stationsUp = stations.slice(0, myStationIndex + 1); //include the home station
  const stationsDown = stations.slice(myStationIndex); //include the home station
  const stationCodes = stations.map(getStationCode);
  const stationUpCodes = stationsUp.map(getStationCode);
  const stationDownCodes = stationsDown.map(getStationCode);

  //Remap Trains Data
  const mappedTrains: TrainWithComputed[] = trains.map(function (train) {
    const trainObj: TrainWithComputed = {
      position: train.pos.split('_'),
      displayType: train.displayType,
      type: train.type,
      direction: train.direction,
      delayMinutes: train.delayMinutes,
      delayStatus:
        train.delayMinutes == 0 ? 'On time' : train.delayMinutes + ' min late',
      dest: train.dest,
      no: train.no, //KEY
      original: train,
      goingFrom: '', //TODO: connect to real station data
      goingFromIndex: null,
      goingFromStation: undefined,
      arrivingAt: '',
      arrivingAtIndex: -1,
      arrivingAtStation: undefined,
      isGoing: false,
      nowPosition: '',
      stationsAway: 0,
    };

    if (trainObj.position[1] === '0000') {
      trainObj.isGoing = false;
      trainObj.goingFromIndex = null;
      trainObj.goingFrom = '';
      const pos0 = trainObj.position[0] ?? '';
      trainObj.arrivingAtIndex = stationCodes.indexOf(pos0);
      trainObj.arrivingAt = pos0;
    } else {
      trainObj.isGoing = true;
      const pos0 = trainObj.position[0] ?? '';
      const pos1 = trainObj.position[1] ?? '';
      var stationIndexA = stationCodes.indexOf(pos0);
      var stationIndexB = stationCodes.indexOf(pos1);

      if (trainObj.direction == DIRECTION.UP) {
        //choose the bigger index
        trainObj.goingFromIndex = Math.max(stationIndexA, stationIndexB);
        trainObj.arrivingAtIndex = Math.min(stationIndexA, stationIndexB);
      } else {
        //down, so choose the smaller index
        trainObj.goingFromIndex = Math.min(stationIndexA, stationIndexB);
        trainObj.arrivingAtIndex = Math.max(stationIndexA, stationIndexB);
      }

      trainObj.goingFrom = stationCodes[trainObj.goingFromIndex] ?? '';
      trainObj.arrivingAt = stationCodes[trainObj.arrivingAtIndex] ?? '';
    }

    trainObj.goingFromStation = stations.find(
      findStationFromCode(trainObj.goingFrom)
    );
    trainObj.arrivingAtStation = stations.find(
      findStationFromCode(trainObj.arrivingAt)
    );

    //if name can't be looked up
    trainObj.arrivingAtStation = trainObj.arrivingAtStation || {
      info: { name: '???' },
    };

    //distance from mystation
    trainObj.stationsAway =
      Math.abs(trainObj.arrivingAtIndex - myStationIndex) +
      (trainObj.isGoing ? 0.5 : 0);

    if (trainObj.isGoing) {
      trainObj.nowPosition = 'going to ' + trainObj.arrivingAtStation.info.name;
    } else {
      trainObj.nowPosition = 'at ' + trainObj.arrivingAtStation.info.name;
    }

    return trainObj;
  });

  //Now, check for trains that are heading towards target station
  //These trains might be arrived, might be 10 stops away

  //Trains heading down
  const trainsHeadingDown = mappedTrains.filter(function (train) {
    var isDirectionOK = train.direction == DIRECTION.DOWN;
    var isBeforeStation = stationUpCodes.includes(train.arrivingAt);
    return isDirectionOK && isBeforeStation;
  });
  trainsHeadingDown.sort(function (a, b) {
    //arrange so first to arrive train is at the top
    return b.arrivingAtIndex - a.arrivingAtIndex;
  });
  const trainsHeadingUp = mappedTrains.filter(function (train) {
    var isDirectionOK = train.direction == DIRECTION.UP;
    var isAfterStation = stationDownCodes.includes(train.arrivingAt);
    return isDirectionOK && isAfterStation;
  });
  trainsHeadingUp.sort(function (a, b) {
    //arrange so first to arrive train is at the top
    return a.arrivingAtIndex - b.arrivingAtIndex;
  });

  function getSimpleTrainInfo(train: TrainWithComputed) {
    return {
      boundFor: typeof train.dest === 'string' ? train.dest : train.dest.text,
      type: train.displayType,
      nowPosition: train.nowPosition,
      delayStatus: train.delayStatus,
      stationsAway: train.stationsAway,
      no: train.no,
    };
  }

  var trainsHeadingUpSimple = trainsHeadingUp.map(getSimpleTrainInfo);
  var trainsHeadingDownSimple = trainsHeadingDown.map(getSimpleTrainInfo);

  var result = {
    station: {
      stationCode: stationCode,
      stationName: myStation.info.name,
      stationType: myStation.info.stopTrains
        ? myStation.info.stopTrains
            .map(function (stop: number) {
              return STOPTRAINS[stop as keyof typeof STOPTRAINS];
            })
            .join(', ')
        : '',
    },
    trainsUp: trainsHeadingUpSimple,
    trainsDown: trainsHeadingDownSimple,
  };

  return result;
}

async function checkTrains(line: string, station: string) {
  if (!station) {
    throw new Error('No station code specified');
  }

  console.log('Loading...');

  const stationsResponse = await westJrApi(
    `https://www.train-guide.westjr.co.jp/api/v3/${line}_st.json`
  );
  if (!stationsResponse.ok) {
    const body = await stationsResponse.text();
    throw new Error(
      `Stations API error ${stationsResponse.status}: ${body}`.slice(0, 500)
    );
  }
  const trainsResponse = await westJrApi(
    `https://www.train-guide.westjr.co.jp/api/v3/${line}.json`
  );
  if (!trainsResponse.ok) {
    const body = await trainsResponse.text();
    throw new Error(
      `Trains API error ${trainsResponse.status}: ${body}`.slice(0, 500)
    );
  }
  const [stations, trains] = await Promise.all([
    stationsResponse.json<StationsApi>(),
    trainsResponse.json<TrainsApi>(),
  ]);

  console.log('Station and Train Data Loaded!');

  return getTrainDelays(stations.stations, trains.trains, station);
}

// GET /api/line - Fetches all train lines
app.get('/api/line', async (c) => {
  const response = await westJrApi(
    'https://www.train-guide.westjr.co.jp/api/v3/area_kinki_master.json'
  );
  if (!response.ok) {
    const body = await response.text();
    console.error('Lines API error:', response.status, body);
    return c.json({ error: 'Upstream API error' }, 502);
  }
  const result = await response.json<{
    lines: Record<
      string,
      {
        name: string;
        [key: string]: any;
      }
    >;
  }>();

  const lines = result.lines;

  const processed = Object.entries(lines).map(([id, value]) => ({
    id,
    name: value.name,
  }));

  console.log(processed);

  return c.json(processed);
});

// GET /api/line/:line - Fetches stations for a line
app.get('/api/line/:line', async (c) => {
  const line = c.req.param('line');

  if (!line) {
    return c.json({ error: 'No line name specified' }, 400);
  }

  const url = `https://www.train-guide.westjr.co.jp/api/v3/${line}_st.json`;

  console.log('Loading...');

  const response = await westJrApi(url);
  if (!response.ok) {
    const body = await response.text();
    console.error('Stations API error:', response.status, body);
    return c.json({ error: 'Upstream API error' }, 502);
  }
  const data = await response.json<StationsApi>();

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

  return c.json(stationsNew);
});

// GET /api/line/:line/:station - Fetches train information
app.get('/api/line/:line/:station', async (c) => {
  const line = c.req.param('line');
  const station = c.req.param('station');

  if (!line || !station) {
    return c.json({ error: 'Line and station required' }, 400);
  }

  try {
    const result = await checkTrains(line, station);
    return c.json(result);
  } catch (error) {
    console.error('Error fetching trains:', error);
    return c.json({ error: 'Failed to fetch train data' }, 500);
  }
});

export default {
  fetch: app.fetch,
} satisfies ExportedHandler<Env>;
