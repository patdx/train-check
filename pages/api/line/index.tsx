import { fetchJson } from '../../../utils/fetch-json';

export default function () {
  return fetchJson('https://www.train-guide.westjr.co.jp/api/v1/master.json')
    .toPromise()
    .then(function (result) {
      var lines = result.data.lines;
      var keys = Object.keys(lines);
      return keys.map(function (i) {
        return {
          id: i,
          name: lines[i].name,
        };
      });
    });
}
