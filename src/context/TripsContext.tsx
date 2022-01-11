/** @format */

import React, { useState, createContext } from "react";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { TripType } from "../interfaces/tripObjects";
import { firebase_auth, firebase_firestore } from "../config/firebase";
import { initialTripData } from "./initialTripData";
import { encodeTrips, decodeTrips } from "../helpers/trips";

type TripsContextProviderProps = {
  children: React.ReactElement;
};

type TripsContextType = {
  tripsList: TripType[];
  initiateTrips: () => void;
  refreshTrips: () => void;
  getTripById: (id: string | undefined) => TripType;
  addTrip: (title: string, colorId: number) => void;
};

export const TripsContext = createContext({} as TripsContextType);

export const TripsContextProvider = ({
  children,
}: TripsContextProviderProps) => {
  const [tripsList, setTripsList] = useState<TripType[]>([]);

  const initiateTrips = async () => {
    if (firebase_auth.currentUser) {
      const docRef = doc(
        firebase_firestore,
        "users",
        firebase_auth.currentUser.uid
      );
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(
          doc(firebase_firestore, "users", firebase_auth.currentUser.uid),
          {
            tripData: encodeTrips(initialTripData),
          }
        );
      }
    }
  };

  const refreshTrips = async () => {
    if (firebase_auth.currentUser) {
      const docRef = doc(
        firebase_firestore,
        "users",
        firebase_auth.currentUser.uid
      );
      setTimeout(async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // User Exists
          let tripData = decodeTrips(docSnap.data().tripData);
          setTripsList(tripData);
        }
      }, 2000);
    }
  };

  function getTripById(id: string | undefined): TripType {
    let defaultTrip = tripsList[0];
    for (let trip of tripsList) {
      if (trip.id === id) {
        return trip;
      }
    }
    return defaultTrip;
  }

  const addTrip = async (title: string, colorId: number) => {
    let newTrip: TripType = {
      id: uuidv4(),
      title: title,
      colorId: colorId,
      peopleList: [],
      activityList: [],
    };
    let tempTripsList = tripsList;
    tempTripsList.push(newTrip);
    setTripsList(tempTripsList);
    if (firebase_auth.currentUser) {
      const docRef = doc(
        firebase_firestore,
        "users",
        firebase_auth.currentUser.uid
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await setDoc(
          doc(firebase_firestore, "users", firebase_auth.currentUser.uid),
          {
            tripData: encodeTrips(tripsList),
          }
        );
      }
    }
  };

  return (
    <TripsContext.Provider
      value={{ tripsList, initiateTrips, refreshTrips, getTripById, addTrip }}
    >
      {children}
    </TripsContext.Provider>
  );
};
