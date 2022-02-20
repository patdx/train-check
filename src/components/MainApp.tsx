import Link from 'next/link';
import { Fragment } from 'react';
import Head from 'next/head';
import { LineStationPicker } from './LineStationPicker';
import { StationInfo } from './StationInfo';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

export const MainApp: NextPage = () => {
  const router = useRouter();
  const { line, station } = router.query;

  return (
    <Fragment>
      <Head>
        <title>TrainCheck</title>
      </Head>

      <div className="nav w-screen">
        <div className="nav-container max-w-2xl h-12 mx-auto">
          <Link href="/">
            <a>
              <img
                src="/logo.svg"
                style={{ maxWidth: '300px' }}
                alt={'TrainCheck'}
              />
            </a>
          </Link>
        </div>
      </div>
      {/* TODO: figure out why this does not align to the center of the page quite exactly */}
      <div className="w-screen max-w-2xl px-2 py-16 mx-auto">
        <LineStationPicker line={line} station={station} />
        {Boolean(line && station) && (
          <StationInfo line={line} station={station} />
        )}
      </div>
    </Fragment>
  );
};
