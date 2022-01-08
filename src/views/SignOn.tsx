/** @format */

import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { firebase_auth, firebase_google_provider } from "../config/firebase";

import HeaderSignOn from "../components/signOn/HeaderSignOn";
import SignInButton from "../components/misc/SignInButton";

const SignOn = () => {
  return (
    <div className="page">
      <HeaderSignOn />
      <SignInButton />
    </div>
  );
};
export default SignOn;
