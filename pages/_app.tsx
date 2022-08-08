/** @format */
import type { AppProps } from "next/app";

import TripDataContextProvider from "../context/TripDataContext";
import UiContextProvider from "../context/UiContext";
import AnalyticsContextProvider from "../context/AnalyticsContext";

import "../styles/globals.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <TripDataContextProvider>
      <UiContextProvider>
        <AnalyticsContextProvider>
          <Component {...pageProps} />
        </AnalyticsContextProvider>
      </UiContextProvider>
    </TripDataContextProvider>
  );
}

export default MyApp;
