/** @format */

import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { firebaseAuth } from './config';

export async function useGoogleSignIn() {
  try {
    let provider = new GoogleAuthProvider();
    const res = await signInWithPopup(firebaseAuth, provider);
    return res.user;
  } catch (err) {
    console.error(err);
  }
}

export async function useAnonymousSingIn() {
  const res = await signInAnonymously(firebaseAuth);
  return res.user;
}

export async function useSignOut() {
  try {
    await signOut(firebaseAuth);
  } catch (error) {
    console.error(error);
  }
}
