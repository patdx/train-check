import Link from 'next/link';
import { Fragment } from 'react';
import Head from 'next/head';
import LineStationPicker from '../components/LineStationPicker';
import StationInfo from '../components/StationInfo';

const IndexPage = () => (
  // <Layout title="Home | Next.js + TypeScript Example">
  <Fragment>
    <Head>
      <title>TrainCheck</title>
    </Head>
    {/* <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p> */}

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
      <LineStationPicker />
      <StationInfo />
      {/* <Line */}
      {/* <Route path="/:line?/:station?" component={LineStationPicker} /> */}
      {/* <Route path="/:line/:station" component={StationInfo} /> */}
    </div>
  </Fragment>
);

export default IndexPage;
