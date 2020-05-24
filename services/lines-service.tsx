import memoizer from 'promise-memoize';

const lineURL = "/api/line/";

export const getLinesAsync = memoizer(async function () {
  let result = await fetch(lineURL);
  return (await result.json()).map((i: any) => { return { text: i.name, id: i.id } });
});

export const getStationsAsync = memoizer(async function (lineName) {
  if (!lineName) return [];
  let result = await fetch(lineURL + lineName);
  return (await result.json()).map(i => { return { text: i.name, id: i.code } });
});

export async function getTrainsAsync(line: any, station: any) {
  let result = await fetch(lineURL + line + "/" + station);
  let resultJSON = await result.json();
  return resultJSON;
}