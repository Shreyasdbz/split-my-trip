/** @format */

import { doc, setDoc, getDoc } from "@firebase/firestore";
import { firebase_auth, firebase_firestore } from "../config/firebase";

import { initialTripData } from "../context/initialTripData";
import { TripType } from "../interfaces/tripObjects";

export const initialUserPrep = async () => {
  if (firebase_auth.currentUser) {
    // First Time Sign In
    // -> Prepare doc with specific userID
    //   await setDoc(
    //     doc(firebase_firestore, "users", firebase_auth.currentUser.uid),
    //     {
    //       tripData: [],
    //     }
    //   );
    //
    // const userRef = doc(
    //   firebase_firestore,
    //   "users",
    //   firebase_auth.currentUser.uid
    // );
    // setDoc(userRef, { tripData: ["test1", "test2"] }, { merge: false })
    //   .then(() => {})
    //   .catch((errMsg) => {
    //     console.log("initialUserPrep firestore error");
    //     alert(errMsg);
    //   });
    //
    const docRef = doc(
      firebase_firestore,
      "users",
      firebase_auth.currentUser.uid
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //   exists
    } else {
      // New User
      await setDoc(
        doc(firebase_firestore, "users", firebase_auth.currentUser.uid),
        {
          tripData: initialTripData,
        }
      );
    }
  }
};

export const getTrips = async () => {
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
        return tripData;
      } else {
        console.log("getTrips error");
      }
    }, 2000);
  }
  //
};
