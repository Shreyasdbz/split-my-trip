/** @format */

import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { firebaseAuth } from "./config";

/**
 *
 * @returns
 */
export async function useGoogleSignIn() {
  try {
    let provider = new GoogleAuthProvider();
    const res = await signInWithPopup(firebaseAuth, provider);
    return res.user;
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 * @returns
 */
export async function useAppleSignIn() {
  try {
    let provider = new OAuthProvider("apple.com");
    const res = await signInWithPopup(firebaseAuth, provider);
    return res.user;
  } catch (err) {
    console.error(err);
  }
}

/**
 *
 * @returns
 */
export async function useSignOut() {
  try {
    await signOut(firebaseAuth);
  } catch (error) {
    console.error(error);
  }
}
