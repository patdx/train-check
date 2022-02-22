import { fetchJson } from '../../../utils/fetch-json';
import { NextApiRequest, NextApiResponse } from 'next';
import { firstValueFrom } from 'rxjs';

export default async function (_req: NextApiRequest, res: NextApiResponse) {
  const result = await firstValueFrom(
    fetchJson<{
      lines: Record<
        string,
        {
          name: string;
          [key: string]: any;
        }
      >;
    }>('https://www.train-guide.westjr.co.jp/api/v3/area_kinki_master.json')
  );

  const lines = result.lines;

  const processed = Object.entries(lines).map(([id, value]) => ({
    id,
    name: value.name,
  }));

  console.log(processed);

  return res.json(processed);
}
