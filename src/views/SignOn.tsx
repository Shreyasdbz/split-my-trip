/** @format */

import { firebase_auth, firebase_google_provider } from "../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SignInButton from "../components/misc/SignInButton";

import Header from "../components/common/Header";

const SignOn = () => {
  return (
    <div className="page">
      <Header />
      <SignInButton />
    </div>
  );
};
export default SignOn;
