export default function () {
  return fetch('https://www.train-guide.westjr.co.jp/api/v1/master.json')
    .then((result) => result.json())
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
