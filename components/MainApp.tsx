import Link from 'next/link';
import { Fragment } from 'react';
import Head from 'next/head';
import LineStationPicker from './LineStationPicker';
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

      <div className="nav">
        <div className="nav-container">
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
      <div className="main-container">
        <LineStationPicker line={line} station={station} />
        {Boolean(line && station) && (
          <StationInfo line={line} station={station} />
        )}
      </div>
    </Fragment>
  );
};
