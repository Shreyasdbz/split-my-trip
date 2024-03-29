/** @format */

import { useContext, useState } from "react";
import { IoLogoGoogle } from "react-icons/io5";
import { signInWithPopup } from "@firebase/auth";

import { InfoModalTypes } from "../interfaces/commonView";
import { firebase_auth, firebase_google_provider } from "../config/firebase";
import { ThemeContext } from "../context/ThemeContext";
import { TripsContext } from "../context/TripsContext";

import InfoTab from "../components/common/InfoTab";
import Modal from "../components/common/Modal";
import InfoModal from "../components/common/InfoModal";

const SignOn = () => {
  const initiateTripsFunction = useContext(TripsContext).initiateTrips;

  const [infoModalActive, setInfoModalActive] = useState(false);

  function signIn() {
    signInWithPopup(firebase_auth, firebase_google_provider)
      .then(() => {
        initiateTripsFunction();
      })
      .catch((errMsg) => {
        console.log("[SignOn.tsx] -- signInWithPopup ERROR: ", errMsg);
      });
  }

  function handleInfo(payload: InfoModalTypes) {
    if (payload.action === "OPEN") {
      setInfoModalActive(true);
    } else if (payload.action === "CLOSE") {
      setInfoModalActive(false);
    }
  }

  const theme = useContext(ThemeContext).theme;

  return (
    <div className="page sign-on-page">
      {infoModalActive && <div className="blur-layer" />}

      <Modal activeOn={infoModalActive}>
        <InfoModal handler={handleInfo} />
      </Modal>

      <div className="page-container">
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
      </div>

      <InfoTab handler={handleInfo} />
    </div>
  );
};
export default SignOn;
