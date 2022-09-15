/** @format */

import * as analytics from "firebase/analytics";

import { firebaseApp, firebaseAuth, firebaseFirestore } from "./config";
import {
  checkIfUserExists,
  createUserDocData,
  getUserDocData,
  createTripDoc,
  getTripDoc,
  updateTripDoc,
  updateUserDocData,
} from "./db";
import { useAppleSignIn, useGoogleSignIn, useSignOut } from "./auth";

export const firebaseLib = {
  config: {
    firebaseApp,
    firebaseAuth,
    firebaseFirestore,
    firebaseAnalytics: analytics,
  },
  db: {
    checkIfUserExists,
    createUserDocData,
    getUserDocData,
    createTripDoc,
    getTripDoc,
    updateTripDoc,
    updateUserDocData,
  },
  auth: {
    useAppleSignIn,
    useGoogleSignIn,
    useSignOut,
  },
};
