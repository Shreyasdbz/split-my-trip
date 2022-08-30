/** @format */
import { User } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

import { firebaseConfigLib } from "./config";

const usersCollectionRef = collection(firebaseConfigLib.firestore, "users");
const tripsCollectionRef = collection(firebaseConfigLib.firestore, "trips");

const CONSOLE_LOG_CALLS: boolean = false;

/**
 *
 * @param user
 * @returns
 */
async function checkIfUserExists(callIdentifier: string, user: User) {
  if (CONSOLE_LOG_CALLS === true)
    console.log(`checkIfUserExists() called with: ${callIdentifier}`);
  const userDocRef = doc(usersCollectionRef, user.uid);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
}

/**
 *
 * @param user
 * @param userDocData
 * @returns
 */
async function createUserDocData(
  callIdentifier: string,
  user: User,
  userDocData: IUserDoc
) {
  if (CONSOLE_LOG_CALLS === true)
    console.log(`createUserDocData() called with: ${callIdentifier}`);
  const userDocRef = doc(usersCollectionRef, user.uid);
  return await setDoc(userDocRef, userDocData);
}

/**
 *
 * @param user
 * @returns
 */
async function getUserDocData(callIdentifier: string, user: User) {
  if (CONSOLE_LOG_CALLS === true)
    console.log(`getUserDocData() called with: ${callIdentifier}`);
  const userDocRef = doc(usersCollectionRef, user.uid);
  return await getDoc(userDocRef);
}

/**
 *
 * @param user
 * @param userDocData
 * @returns
 */
async function updateUserDocData(
  callIdentifier: string,
  user: User,
  userDocData: IUserDoc,
  deleteDoc?: boolean
) {
  if (CONSOLE_LOG_CALLS === true)
    console.log(`updateUserDocData() called with: ${callIdentifier}`);
  if (!deleteDoc) {
    const userDocRef = doc(usersCollectionRef, user.uid);
    return await setDoc(userDocRef, userDocData, { merge: true });
  } else {
    //
  }
}

/**
 *
 * @param tripDocData
 * @returns
 */
async function createTripDoc(callIdentifier: string, tripDocData: ITripData) {
  if (CONSOLE_LOG_CALLS === true)
    console.log(`createTripDoc() called with: ${callIdentifier}`);
  const tripDocRef = doc(tripsCollectionRef, tripDocData.id);
  return await setDoc(tripDocRef, tripDocData);
}

/**
 *
 * @param tripDocId
 * @returns
 */
async function getTripDoc(callIdentifier: string, tripDocId: string) {
  if (CONSOLE_LOG_CALLS === true)
    console.log(`getTripDoc() called with: ${callIdentifier}`);
  const tripDocRef = doc(tripsCollectionRef, tripDocId);
  return await getDoc(tripDocRef);
}

/**
 *
 * @param tripDocData
 * @returns
 */
async function updateTripDoc(
  callIdentifier: string,
  tripDocData: ITripData,
  deleteDoc?: boolean
) {
  if (CONSOLE_LOG_CALLS === true)
    console.log(`updateTripDoc() called with: ${callIdentifier}`);
  if (!deleteDoc) {
    const tripDocRef = doc(tripsCollectionRef, tripDocData.id);
    return await setDoc(tripDocRef, tripDocData, { merge: true });
  } else {
  }
}

export const firbaseDbLib = {
  checkIfUserExists,
  getUserDocData,
  createUserDocData,
  updateUserDocData,
  getTripDoc,
  createTripDoc,
  updateTripDoc,
};
