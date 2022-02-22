import { NextApiRequest, NextApiResponse } from 'next';
import { fetchJson } from '../../../../../utils/fetch-json';
import { forkJoin, firstValueFrom } from 'rxjs';
import { StationsApi } from '../../../../../interfaces/stations-api';
import { TrainsApi } from '../../../../../interfaces/trains-api';

const DIRECTION = {
  UP: 0,
  DOWN: 1,
};

const STOPTRAINS = {
  //for the station
  1: 'Special Rapid',
  2: 'Local',
};

///////////////////

function getTrainDelays(stations, trains, stationCode) {
  //Main Processing

  //Stations Prep
  function findStationFromCode(code) {
    return function (station) {
      return station.info.code == code;
    };
  }

  function getStationCode(station) {
    return station.info.code;
  }

  const myStationIndex = stations.findIndex(findStationFromCode(stationCode));

  if (myStationIndex == -1) {
    throw 'Station ' + stationCode + " doesn't exist.";
  }

  const myStation = stations[myStationIndex];
  const stationsUp = stations.slice(0, myStationIndex + 1); //include the home station
  const stationsDown = stations.slice(myStationIndex); //include the home station
  const stationCodes = stations.map(getStationCode);
  const stationUpCodes = stationsUp.map(getStationCode);
  const stationDownCodes = stationsDown.map(getStationCode);

  //Remap Trains Data
  var trains = trains.map(function (train) {
    var trainObj: any = {
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
      goingFrom: null, //TODO: connect to real station data
      goingFromIndex: null,
      goingFromStation: null,
      arrivingAt: null,
      arrivingAtIndex: null,
      arrivingAtStation: null,
      isGoing: null,
      nowPosition: null,
    };

    if (trainObj.position[1] === '0000') {
      trainObj.isGoing = false;
      trainObj.goingFromIndex = null;
      trainObj.goingFrom = null;
      trainObj.arrivingAtIndex = stationCodes.indexOf(trainObj.position[0]);
      trainObj.arrivingAt = trainObj.position[0];
    } else {
      trainObj.isGoing = true;
      var stationIndexA = stationCodes.indexOf(trainObj.position[0]);
      var stationIndexB = stationCodes.indexOf(trainObj.position[1]);

      if (trainObj.direction == DIRECTION.UP) {
        //choose the bigger index
        trainObj.goingFromIndex = Math.max(stationIndexA, stationIndexB);
        trainObj.arrivingAtIndex = Math.min(stationIndexA, stationIndexB);
      } else {
        //down, so choose the smaller index
        trainObj.goingFromIndex = Math.min(stationIndexA, stationIndexB);
        trainObj.arrivingAtIndex = Math.max(stationIndexA, stationIndexB);
      }

      trainObj.goingFrom = stationCodes[trainObj.goingFromIndex];
      trainObj.arrivingAt = stationCodes[trainObj.arrivingAtIndex];
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
      trainObj.isGoing * 0.5;

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
  var trainsHeadingDown = trains.filter(function (train) {
    var isDirectionOK = train.direction == DIRECTION.DOWN;
    var isBeforeStation = stationUpCodes.includes(train.arrivingAt);
    return isDirectionOK && isBeforeStation;
  });
  trainsHeadingDown.sort(function (a, b) {
    //arrange so first to arrive train is at the top
    return b.arrivingAtIndex - a.arrivingAtIndex;
  });
  var trainsHeadingUp = trains.filter(function (train) {
    var isDirectionOK = train.direction == DIRECTION.UP;
    var isAfterStation = stationDownCodes.includes(train.arrivingAt);
    return isDirectionOK && isAfterStation;
  });
  trainsHeadingUp.sort(function (a, b) {
    //arrange so first to arrive train is at the top
    return a.arrivingAtIndex - b.arrivingAtIndex;
  });

  function getSimpleTrainInfo(train) {
    return {
      boundFor: train.dest.text,
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
            .map(function (stop) {
              return STOPTRAINS[stop];
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

  //TODO: verify its a string and 4 digits long

  console.log('Loading...');

  const { stations, trains } = await firstValueFrom(
    forkJoin({
      stations: fetchJson<StationsApi>(
        `https://www.train-guide.westjr.co.jp/api/v3/${line}_st.json`
      ),
      trains: fetchJson<TrainsApi>(
        `https://www.train-guide.westjr.co.jp/api/v3/${line}.json`
      ),
    })
  );

  console.log('Station and Train Data Loaded!');

  return getTrainDelays(stations.stations, trains.trains, station);
}

//for testing
//checkTrains("0397").then(result => { console.log(result) });

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { line, station } = req.query;

  const result = await checkTrains(line as string, station as string);

  return res.json(result);
}
