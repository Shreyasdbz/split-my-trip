/** @format */
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { FirebaseAuth } from "../lib/firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { FirebaseConfig } from "../lib/firebase/config";

import { TripDataContext } from "../context/TripDataContext";

const SignIn = () => {
  const nextRouter = useRouter();
  const [user, loading, error] = useAuthState(FirebaseConfig.auth);
  const performUserLogin = useContext(TripDataContext).performUserLogin;

  useEffect(() => {
    if (user) {
      nextRouter.push("/home");
    }
  }, [user]);

  return (
    <div>
      <div>test</div>
      <button
        onClick={() => {
          FirebaseAuth.useGoogleSignIn().then((user) => {
            user && performUserLogin(user);
          });
        }}
      >
        Google
      </button>
    </div>
  );
};

export default SignIn;
