/** @format */

import React, { useState, createContext } from "react";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { PersonType, TripType } from "../interfaces/tripObjects";
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
  updateTrip: (trip: TripType, toDelete: boolean) => void;
  addPerson: (tripId: string, name: string) => void;
  updatePerson: (tripId: string, person: PersonType, toDelete: boolean) => void;
};

export const TripsContext = createContext({} as TripsContextType);

export const TripsContextProvider = ({
  children,
}: TripsContextProviderProps) => {
  const [tripsList, setTripsList] = useState<TripType[]>([]);

  // TODO:
  // Enable caching

  const _send_data_to_firestore = async (altTripData?: TripType[]) => {
    if (firebase_auth.currentUser) {
      const docRef = doc(
        firebase_firestore,
        "users",
        firebase_auth.currentUser.uid
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let dataToSend = encodeTrips(tripsList);
        if (altTripData) {
          dataToSend = encodeTrips(altTripData);
        }
        console.log("Sending data: ", dataToSend);
        await setDoc(
          doc(firebase_firestore, "users", firebase_auth.currentUser.uid),
          {
            tripData: dataToSend,
          }
        );
      } else {
        // New User Sign On (ONE TIME)
        let dataToSend = encodeTrips(tripsList);
        if (altTripData) {
          dataToSend = encodeTrips(altTripData);
        }
        console.log("Sending data [New User Sign On]: ", dataToSend);
        await setDoc(
          doc(firebase_firestore, "users", firebase_auth.currentUser.uid),
          {
            tripData: dataToSend,
          }
        );
      }
    }
  };

  const _get_data_from_firestore = async () => {
    setTimeout(async () => {
      if (firebase_auth.currentUser) {
        const docRef = doc(
          firebase_firestore,
          "users",
          firebase_auth.currentUser.uid
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // User Exists
          let tripData = decodeTrips(docSnap.data().tripData);
          setTripsList(tripData);
          console.log("Receiving data: ", tripData);
        }
      }
    }, 1500);
  };

  const initiateTrips = async () => {
    _send_data_to_firestore(initialTripData);
  };

  const refreshTrips = async () => {
    _get_data_from_firestore();
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
    _send_data_to_firestore(tempTripsList);
  };

  const updateTrip = async (trip: TripType, toDelete: boolean) => {
    if (toDelete === true) {
      // Delete
      let tempTripsList: TripType[] = [];
      for (let t of tripsList) {
        if (t.id !== trip.id) tempTripsList.push(t);
      }
      setTripsList(tempTripsList);
      _send_data_to_firestore(tempTripsList);
    } else {
      // Update
      let tempTripsList: TripType[] = tripsList;
      for (let t of tempTripsList) {
        if (t.id === trip.id) {
          t.title = trip.title;
          t.colorId = trip.colorId;
          t.peopleList = trip.peopleList;
          t.activityList = trip.activityList;
        }
      }
      setTripsList(tempTripsList);
      _send_data_to_firestore(tempTripsList);
    }
  };

  const addPerson = async (tripId: string, name: string) => {
    let tempTripsList = tripsList;
    for (let t of tempTripsList) {
      if (t.id === tripId) {
        let newPerson: PersonType = {
          id: uuidv4(),
          name: name,
        };
        t.peopleList.push(newPerson);
      }
    }
    setTripsList(tempTripsList);
    _send_data_to_firestore(tempTripsList);
  };

  const updatePerson = async (
    tripId: string,
    person: PersonType,
    toDelete: boolean
  ) => {
    if (toDelete === true) {
      // Delete
      let tempTripsList: TripType[] = tripsList;
      for (let t of tempTripsList) {
        if (t.id === tripId) {
          let tempPeopleList: PersonType[] = [];
          for (let p of t.peopleList) {
            if (p.id !== person.id) {
              tempPeopleList.push(p);
            }
          }
          t.peopleList = tempPeopleList;
        }
      }
      setTripsList(tempTripsList);
      _send_data_to_firestore(tempTripsList);
    } else {
      // Update
      let tempTripsList = tripsList;
      for (let t of tempTripsList) {
        if (t.id === tripId) {
          for (let p of t.peopleList) {
            if (p.id === person.id) {
              p.name = person.name;
            }
          }
        }
      }
      setTripsList(tempTripsList);
      _send_data_to_firestore(tempTripsList);
    }
  };

  return (
    <TripsContext.Provider
      value={{
        tripsList,
        initiateTrips,
        refreshTrips,
        getTripById,
        addTrip,
        updateTrip,
        addPerson,
        updatePerson,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
};
