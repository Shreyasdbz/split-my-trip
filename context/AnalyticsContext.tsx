/** @format */

import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Analytics } from "firebase/analytics";

import { firebaseLib } from "../lib/firebase";

interface IAnalyticsContext {
  analyticsApp: Analytics | null;
  logPageVisit: (pageName: string) => void;
}
export const AnalyticsContext = createContext({} as IAnalyticsContext);

interface IAnalyticsContextProvider {
  children: React.ReactElement | React.ReactElement[];
}
const AnalyticsContextProvider = ({ children }: IAnalyticsContextProvider) => {
  const nextRouter = useRouter();
  const [analyticsApp, setAnalyticsApp] = useState<Analytics | null>(null);

  function initialize() {
    const app = firebaseLib.config.firebaseAnalytics.initializeAnalytics(
      firebaseLib.config.firebaseApp
    );
    setAnalyticsApp(app);
  }

  function logPageVisit(pageName: string) {
    if (analyticsApp) {
      firebaseLib.config.firebaseAnalytics.logEvent(analyticsApp, "page_view", {
        pageName: pageName,
      });
    }
  }

  function logTripCreated(tripName: string) {
    if (analyticsApp) {
      firebaseLib.config.firebaseAnalytics.logEvent(
        analyticsApp,
        "trip_created",
        {
          tripName: tripName,
        }
      );
    }
  }

  function logPersonAdded(personName: string) {
    if (analyticsApp) {
      firebaseLib.config.firebaseAnalytics.logEvent(
        analyticsApp,
        "person_added",
        {
          personName: personName,
        }
      );
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  const providerValue: IAnalyticsContext = { analyticsApp, logPageVisit };

  return (
    <AnalyticsContext.Provider value={providerValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsContextProvider;
