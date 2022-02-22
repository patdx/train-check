import ky from 'ky-universal';
import memoize from 'promise-memoize';
import urlJoin from 'url-join';

export const getLinesAsync = memoize(async function () {
  const result = await ky('/api/line').json<any[]>();

  return result.map((item) => {
    return { text: item.name, id: item.id };
  });
});

export const getStationsAsync = memoize(async function (lineName) {
  if (!lineName) return [];

  const result = await ky(urlJoin('/api/line', lineName)).json<any[]>();

  return result.map((item) => {
    return { text: item.name, id: item.code };
  });
});

export async function getTrainsAsync(line: any, station: any) {
  const result = await ky(urlJoin('/api/line', line, station)).json<
    Record<string, any>
  >();

  return result;
}
