/** @format */
import { firebase_auth, firebase_google_provider } from "../../config/firebase";
import { signInWithPopup } from "@firebase/auth";

const SignInButton = () => {
  function signIn() {
    signInWithPopup(firebase_auth, firebase_google_provider).catch(
      (errorMessage) => {
        alert(errorMessage);
      }
    );
  }

  return (
    <button className="sign-in-button" onClick={signIn}>
      Sign In
    </button>
  );
};

export default SignInButton;
