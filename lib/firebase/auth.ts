/** @format */

import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { firebaseConfigLib } from "./config";

/**
 *
 * @returns
 */
async function useGoogleSignIn() {
  try {
    let provider = new GoogleAuthProvider();
    const res = await signInWithPopup(firebaseConfigLib.auth, provider);
    return res.user;
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 * @returns
 */
async function useAppleSignIn() {
  try {
    let provider = new OAuthProvider("apple.com");
    const res = await signInWithPopup(firebaseConfigLib.auth, provider);
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
    await signOut(firebaseConfigLib.auth);
  } catch (error) {
    console.error(error);
  }
}

export const firebaseAuthLib = {
  useGoogleSignIn,
  useAppleSignIn,
  useSignOut,
};
