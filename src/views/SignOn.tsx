/** @format */

import { useContext } from "react";
import { IoLogoGoogle } from "react-icons/io5";
import { getAuth, signInWithPopup } from "@firebase/auth";

import { firebase_auth, firebase_google_provider } from "../config/firebase";
import { ThemeContext } from "../context/ThemeContext";

import InfoTab from "../components/common/InfoTab";

const SignOn = () => {
  function signIn() {
    signInWithPopup(firebase_auth, firebase_google_provider).catch((errMsg) =>
      alert(errMsg)
    );
  }

  const theme = useContext(ThemeContext).theme;

  return (
    <div className="page sign-on-page">
      <div className="images">
        <img
          src="/assets/jackWardImage.jpg"
          alt="italyImage"
          className="img imgLeft"
          style={{
            boxShadow: `0px 2px 15px ${theme.text}50`,
          }}
        />
        <img
          src="/assets/jonathanForageImage.jpg"
          alt="campingImage"
          className="img imgMiddle"
          style={{
            boxShadow: `0px 2px 15px ${theme.text}50`,
          }}
        />
        <img
          src="/assets/oxanaImage.jpg"
          alt="planningImage"
          className="img imgRight"
          style={{
            boxShadow: `0px 2px 15px ${theme.text}50`,
          }}
        />
      </div>
      <div className="title">
        <span className="title-font">Split</span>
        <span className="title-font">My</span>
        <span className="title-font">Trip</span>
      </div>
      <div className="caption">
        <span className="caption-font">simplify complicated expenses</span>
      </div>
      <button
        className="sign-on-btn"
        style={{
          backgroundColor: `${theme.background}`,
          border: `3px solid ${theme.text}`,
        }}
        onClick={signIn}
      >
        <div className="logo-wrapper">
          <IoLogoGoogle className="logo" />
        </div>
        <span className="text">Log in with Google</span>
      </button>
      <InfoTab />
    </div>
  );
};
export default SignOn;
