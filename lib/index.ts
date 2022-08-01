/** @format */

import { firebaseAuth, firebaseFirestore } from './firebase/config';
import { useGoogleSignIn, useSignOut } from './firebase/auth';

export const FirebaseLib = {
  firebaseAuth,
  firebaseFirestore,
  useGoogleSignIn,
  useSignOut,
};
