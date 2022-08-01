/** @format */
import { User } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

import { FirebaseConfig } from './config';

const usersCollectionRef = collection(FirebaseConfig.firestore, 'users');
const tripsCollectionRef = collection(FirebaseConfig.firestore, 'trips');

/**
 *
 * @param user
 * @returns
 */
async function checkIfUserExists(user: User) {
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
async function createUserDocData(user: User, userDocData: IUserDoc) {
  const userDocRef = doc(usersCollectionRef, user.uid);
  return await setDoc(userDocRef, userDocData);
}

/**
 *
 * @param user
 * @returns
 */
async function getUserDocData(user: User) {
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
  user: User,
  userDocData: IUserDoc,
  deleteDoc?: boolean
) {
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
async function createTripDoc(tripDocData: ITripData) {
  const tripDocRef = doc(tripsCollectionRef, tripDocData.id);
  return await setDoc(tripDocRef, tripDocData);
}

/**
 *
 * @param tripDocId
 * @returns
 */
async function getTripDoc(tripDocId: string) {
  const tripDocRef = doc(tripsCollectionRef, tripDocId);
  return await getDoc(tripDocRef);
}

/**
 *
 * @param tripDocData
 * @returns
 */
async function updateTripDoc(tripDocData: ITripData, deleteDoc?: boolean) {
  if (!deleteDoc) {
    const tripDocRef = doc(tripsCollectionRef, tripDocData.id);
    return await setDoc(tripDocRef, tripDocData, { merge: true });
  } else {
  }
}

export const FirebaseDb = {
  checkIfUserExists,
  getUserDocData,
  createUserDocData,
  updateUserDocData,
  getTripDoc,
  createTripDoc,
  updateTripDoc,
};
