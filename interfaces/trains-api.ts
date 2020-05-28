export interface TrainsApi {
  /** iso date */
  update: string;
  trains: {
    no: string;
    pos: string;
    direction: number;
    nickname: any;
    type: string;
    displayType: string;
    dest: string;
    delayMinutes: number;
    notice: any;
  }[];
}

// https://www.train-guide.westjr.co.jp/api/v3/manyomahoroba.json
//
// const result = {
//   update: '2020-05-28T13:39:57.799Z',
//   trains: [
//     {
//       no: '579S',
//       pos: '0598_####',
//       direction: 1,
//       nickname: null,
//       type: '10',
//       displayType: '普通',
//       dest: '王寺',
//       delayMinutes: 0,
//       notice: null,
//     },
//     {
//       no: '578S',
//       pos: '0590_####',
//       direction: 0,
//       nickname: null,
//       type: '10',
//       displayType: '普通',
//       dest: '奈良',
//       delayMinutes: 0,
//       notice: null,
//     },
//   ],
// };
