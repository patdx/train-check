import pMemoize from 'p-memoize'; //use to only make each request one time max
const lineURL = "//train-check-server.herokuapp.com/line/";

export const getLinesAsync = pMemoize(async function () {
  let result = await fetch(lineURL);
  return (await result.json()).map(i => { return { text: i.name, id: i.id } });
});

export const getStationsAsync = pMemoize(async function (lineName) {
  if (!lineName) return [];
  let result = await fetch(lineURL + lineName);
  return (await result.json()).map(i => { return { text: i.name, id: i.code } });
});