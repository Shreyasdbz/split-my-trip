/** @format */
import { useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FirebaseAuth } from "../lib/firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { FirebaseConfig } from "../lib/firebase/config";

import { TripDataContext } from "../context/TripDataContext";

import PillButton from "../components/core/PillButton";

import googleLogo from "../public/assets/google-logo.png";
import appleLogo from "../public/assets/apple-logo.png";

const SignIn = () => {
  const nextRouter = useRouter();
  const [user, loading, error] = useAuthState(FirebaseConfig.auth);
  const performUserLogin = useContext(TripDataContext).performUserLogin;

  function googleSignOn() {
    FirebaseAuth.useGoogleSignIn().then((user) => {
      user && performUserLogin(user);
    });
  }
  function appleSignOn() {
    FirebaseAuth.useAppleSignIn().then((user) => {
      user && performUserLogin(user);
    });
  }

  useEffect(() => {
    if (user) {
      nextRouter.push("/home");
    }
  }, [user]);

  return (
    <div className="page sign-on-page">
      <div className="page-container">
        <div className="images">
          <img
            src="/assets/jackWardImage.jpg"
            alt="italyImage"
            className="img imgLeft shadow-md shadow-gray-600/50"
          />
          <img
            src="/assets/jonathanForageImage.jpg"
            alt="campingImage"
            className="img imgMiddle shadow-md shadow-gray-600/50"
          />
          <img
            src="/assets/oxanaImage.jpg"
            alt="planningImage"
            className="img imgRight shadow-md shadow-gray-600/50"
          />
        </div>
        <div className="title md:pl-8">
          <span className="text-7xl md:text-8xl headerFont">Split</span>
          <span className="text-7xl md:text-8xl headerFont">My</span>
          <span className="text-7xl md:text-8xl headerFont">Trip</span>
        </div>
        <div className="">
          <span className="text-lg md:text-xl lg:text-2xl font-normal text-gray-500">
            simplify complicated expenses
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <PillButton
            text={"Google Sign On"}
            type={"OUTLINE"}
            size={"LARGE-WIDE"}
            onClickAction={googleSignOn}
          >
            <div className="flex flex-row items-center justify-between gap-6">
              <div className="w-8 h-8 relative">
                <Image src={googleLogo} layout={"fill"} />
              </div>
              <span className="font-lg font-semibold">Sign in with Google</span>
            </div>
          </PillButton>
          <PillButton
            text={"Apple Sign On"}
            type={"OUTLINE"}
            size={"LARGE-WIDE"}
            onClickAction={appleSignOn}
          >
            <div className="flex flex-row items-center justify-between gap-6">
              <div className="w-8 h-8 relative">
                <Image src={appleLogo} layout={"fill"} />
              </div>
              <span className="font-lg font-semibold">Sign in with Apple</span>
            </div>
          </PillButton>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
