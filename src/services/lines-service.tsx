import memoize from 'promise-memoize';
import { fetchJson } from '../utils/fetch-json';
import urlJoin from 'url-join';

export const getLinesAsync = memoize(async function () {
  let result = await fetchJson('/api/line').toPromise();

  return result.map((item) => {
    return { text: item.name, id: item.id };
  });
});

export const getStationsAsync = memoize(async function (lineName) {
  if (!lineName) return [];

  const result = await fetchJson(urlJoin('/api/line', lineName)).toPromise();
  return result.map((item) => {
    return { text: item.name, id: item.code };
  });
});

export async function getTrainsAsync(line: any, station: any) {
  const result = await fetchJson(
    urlJoin('/api/line', line, station)
  ).toPromise();
  return result;
}
