/** @format */

import type { AppProps } from 'next/app';

import TripDataContextProvider from '../context/TripDataContext';
import UiContextProvider from '../context/UiContext';

import '../styles/globals.scss';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <TripDataContextProvider>
      <UiContextProvider>
        <Component {...pageProps} />
      </UiContextProvider>
    </TripDataContextProvider>
  );
}

export default MyApp;
