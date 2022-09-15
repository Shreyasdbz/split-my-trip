/** @format */
import { User } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseFirestore } from "./config";

const usersCollectionRef = collection(firebaseFirestore, "users");
const tripsCollectionRef = collection(firebaseFirestore, "trips");

const CONSOLE_LOG_CALLS: boolean = false;

/**
 *
 * @param user
 * @returns
 */
export async function checkIfUserExists(callIdentifier: string, user: User) {
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
export async function createUserDocData(
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
export async function getUserDocData(callIdentifier: string, user: User) {
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
export async function updateUserDocData(
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
export async function createTripDoc(
  callIdentifier: string,
  tripDocData: ITripData
) {
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
export async function getTripDoc(callIdentifier: string, tripDocId: string) {
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
export async function updateTripDoc(
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
