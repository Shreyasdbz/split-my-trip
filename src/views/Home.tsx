/** @format */

import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  orderBy,
  limit,
  serverTimestamp,
  addDoc,
} from "@firebase/firestore";
import { Timestamp } from "@firebase/firestore-types";

import { firebase_auth, firebase_firestore } from "../config/firebase";
import { tripType } from "../interfaces/trips";

import HeaderHome from "../components/home/HeaderHome";

const Home = () => {
  const tripsRef = collection(firebase_firestore, "trips");
  const q = query(tripsRef, orderBy("createdAt", "asc"), limit(25));
  const [trips] = useCollectionData(q, { idField: "userId" });

  const [nameVal, setNameVal] = useState("");

  const addTrip = async () => {
    if (firebase_auth.currentUser) {
      let trip = {
        userId: firebase_auth.currentUser.uid,
        name: nameVal,
        createdAt: serverTimestamp(),
      };
      await addDoc(tripsRef, trip).catch((err) => alert(err));
    }
  };

  console.log(trips);

  return (
    <div className="page">
      <HeaderHome />
      <h1>Home!!!</h1>
      <input
        type="text"
        value={nameVal}
        onChange={(e) => {
          setNameVal(e.target.value);
        }}
      />
      <ul className="trips">
        {trips?.map((trip) => {
          return <li key={trip.id}>{trip.name}</li>;
        })}
      </ul>
      <button onClick={addTrip}>Add Trip</button>
      <button
        onClick={() => {
          firebase_auth.signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Home;
