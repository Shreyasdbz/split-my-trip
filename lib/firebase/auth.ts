/** @format */

import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { FirebaseConfig } from './config';

/**
 *
 * @returns
 */
async function useGoogleSignIn() {
  try {
    let provider = new GoogleAuthProvider();
    const res = await signInWithPopup(FirebaseConfig.auth, provider);
    return res.user;
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 * @returns
 */
async function useSignOut() {
  try {
    await signOut(FirebaseConfig.auth);
  } catch (error) {
    console.error(error);
  }
}

export const FirebaseAuth = {
  useGoogleSignIn,
  useSignOut,
};
