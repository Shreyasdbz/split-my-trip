/** @format */

import { doc, setDoc } from "@firebase/firestore";

import { firebase_auth, firebase_firestore } from "../config/firebase";

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
    const userRef = doc(
      firebase_firestore,
      "users",
      firebase_auth.currentUser.uid
    );
    setDoc(userRef, { tripData: [] }, { merge: false })
      .then(() => {})
      .catch((errMsg) => {
        alert(errMsg);
      });
  }
};
