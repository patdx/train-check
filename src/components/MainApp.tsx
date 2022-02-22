import Link from 'next/link';
import { Fragment } from 'react';
import Head from 'next/head';
import { LineStationPicker } from './LineStationPicker';
import { StationInfo } from './StationInfo';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

export const MainApp: NextPage = () => {
  const router = useRouter();
  const line = router.query.line as string;
  const station = router.query.station as string;

  return (
    <Fragment>
      <Head>
        <title>TrainCheck</title>
      </Head>

      <div className="sticky top-0 bg-white shadow">
        <div className="nav-container mx-auto max-w-2xl">
          <Link href="/">
            <a className="mr-auto block">
              <h1 className="bg-gradient-to-br from-blue-700 to-blue-400 bg-clip-text p-2 text-5xl font-extrabold text-transparent">
                Train Check
              </h1>
            </a>
          </Link>
        </div>
      </div>
      {/* TODO: figure out why this does not align to the center of the page quite exactly */}
      <div className="mx-auto max-w-2xl p-2">
        <LineStationPicker line={line} station={station} />
        {Boolean(line && station) && (
          <StationInfo line={line} station={station} />
        )}
      </div>
    </Fragment>
  );
};
