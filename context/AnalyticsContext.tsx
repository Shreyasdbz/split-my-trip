/** @format */

import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Analytics } from "firebase/analytics";

import { FirebaseConfig } from "../lib/firebase/config";

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
    const app = FirebaseConfig.analytics.initializeAnalytics(
      FirebaseConfig.app
    );
    setAnalyticsApp(app);
  }

  function logPageVisit(pageName: string) {
    if (analyticsApp) {
      FirebaseConfig.analytics.logEvent(analyticsApp, "page_view", {
        pageName: pageName,
      });
    }
  }

  function logTripCreated(tripName: string) {
    if (analyticsApp) {
      FirebaseConfig.analytics.logEvent(analyticsApp, "trip_created", {
        tripName: tripName,
      });
    }
  }

  function logPersonAdded(personName: string) {
    if (analyticsApp) {
      FirebaseConfig.analytics.logEvent(analyticsApp, "person_added", {
        personName: personName,
      });
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
