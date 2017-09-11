//import pMemoize from 'p-memoize'; //use to only make each request just one time
import memoizer from 'promise-memoize';
const lineURL = "//train-check-server.herokuapp.com/line/";

export const getLinesAsync = memoizer(async function () {
  let result = await fetch(lineURL);
  return (await result.json()).map(i => { return { text: i.name, id: i.id } });
});

export const getStationsAsync = memoizer(async function (lineName) {
  if (!lineName) return [];
  let result = await fetch(lineURL + lineName);
  return (await result.json()).map(i => { return { text: i.name, id: i.code } });
});

export async function getTrainsAsync(line, station) {
  let result = await fetch(lineURL + line + "/" + station);
  let resultJSON = await result.json();
  return resultJSON;
}