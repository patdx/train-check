import memoizer from 'promise-memoize';
import { fetchJson } from '../utils/fetch-json';

const lineURL = '/api/line/';

export const getLinesAsync = memoizer(async function () {
  let result = await fetchJson(lineURL).toPromise();

  return result.map((i: any) => {
    return { text: i.name, id: i.id };
  });
});

export const getStationsAsync = memoizer(async function (lineName) {
  if (!lineName) return [];

  let result = await fetchJson(lineURL + lineName).toPromise();
  return result.map((i) => {
    return { text: i.name, id: i.code };
  });
});

export async function getTrainsAsync(line: any, station: any) {
  let resultJSON = await fetchJson(lineURL + line + '/' + station).toPromise();
  return resultJSON;
}
