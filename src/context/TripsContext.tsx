/** @format */

import React, { useState, createContext } from "react";
import { doc, getDoc } from "@firebase/firestore";

import { TripType } from "../interfaces/tripObjects";
import { firebase_auth, firebase_firestore } from "../config/firebase";

type TripsContextProviderProps = {
  children: React.ReactElement;
};

type TripsContextType = {
  tripsList: TripType[];
  loadTrips: () => void;
  updateTrips: (newList: TripType[]) => void;
};

export const TripsContext = createContext({} as TripsContextType);

export const TripsContextProvider = ({
  children,
}: TripsContextProviderProps) => {
  const [tripsList, setTripsList] = useState<TripType[]>([]);

  function updateTrips(newList: TripType[]) {
    setTripsList(newList);
  }

  const loadTrips = async () => {
    if (firebase_auth.currentUser) {
      const docRef = doc(
        firebase_firestore,
        "users",
        firebase_auth.currentUser.uid
      );
      setTimeout(async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let tripData = docSnap.data().tripData;
          setTripsList(tripData);
        } else {
          console.log("getTrips error");
        }
      }, 1000);
    }
  };

  return (
    <TripsContext.Provider value={{ tripsList, loadTrips, updateTrips }}>
      {children}
    </TripsContext.Provider>
  );
};
