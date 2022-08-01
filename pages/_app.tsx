/** @format */

import type { AppProps } from 'next/app';

import TripDataContextProvider from '../context/TripDataContext';

import '../styles/globals.scss';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <TripDataContextProvider>
      <Component {...pageProps} />
    </TripDataContextProvider>
  );
}

export default MyApp;
