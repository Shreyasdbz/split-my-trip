/** @format */

import { useState, useContext, useEffect } from "react";
import { IoAddCircle } from "react-icons/io5";

import { NewTripTypes, UserSettingsType } from "../interfaces/homeView";
import { InfoModalTypes } from "../interfaces/commonView";
import { TripsContext } from "../context/TripsContext";
import { ThemeContext } from "../context/ThemeContext";
import { firebase_auth } from "../config/firebase";

import Header from "../components/home/Header";
import TripsList from "../components/home/TripsList";
import CornerActionButton from "../components/common/CornerActionButton";
import InfoTab from "../components/common/InfoTab";
import Modal from "../components/common/Modal";
import NewTripModal from "../components/home/NewTripModal";
import UserSettingsModal from "../components/home/UserSettingsModal";
import InfoModal from "../components/common/InfoModal";

const Home = () => {
  const addTripFunction = useContext(TripsContext).addTrip;
  const refreshTripsFunction = useContext(TripsContext).refreshTrips;
  const toggleThemeFunction = useContext(ThemeContext).toggleTheme;

  const [addTripModalActive, setaddTripModalActive] = useState(false);
  const [userSettingsModalActive, setUserSettingsModalActive] = useState(false);
  const [infoModalActive, setInfoModalActive] = useState(false);

  const handleAddTrip = async (payload: NewTripTypes) => {
    if (payload.action === "OPEN") {
      // Open the modal
      setaddTripModalActive(true);
    } else if (payload.action === "CLOSE") {
      // Close the modal
      setaddTripModalActive(false);
    } else if (payload.action === "CONFIRM") {
      let errorMessage = "";
      // Incorrect trip title
      if (payload.title.length < 2) {
        errorMessage = "Please enter a minimum of 2 characters";
      }
      // Pack and send the object to firestore
      if (errorMessage === "") {
        setaddTripModalActive(false);
        addTripFunction(payload.title, payload.colorId);
      } else {
        alert(errorMessage);
      }
    }
  };

  function handleUserSettings(payload: UserSettingsType) {
    if (payload.action === "OPEN") {
      setUserSettingsModalActive(true);
    } else if (payload.action === "CLOSE") {
      setUserSettingsModalActive(false);
    } else if (payload.action === "CONFIRM") {
      if (payload.type === "TOGGLE THEME") {
        toggleThemeFunction();
      } else if (payload.type === "LOGOUT") {
        firebase_auth.signOut().catch((errMsg) => {
          alert(errMsg);
        });
      }
    }
  }

  function handleInfo(payload: InfoModalTypes) {
    if (payload.action === "OPEN") {
      setInfoModalActive(true);
    } else if (payload.action === "CLOSE") {
      setInfoModalActive(false);
    }
  }

  useEffect(() => {
    refreshTripsFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page home-page">
      {(addTripModalActive || userSettingsModalActive || infoModalActive) && (
        <div className="blur-layer" />
      )}

      {/* New Trip Modal */}
      <Modal activeOn={addTripModalActive}>
        <NewTripModal handler={handleAddTrip} />
      </Modal>

      {/* User Settings Modal */}
      <Modal activeOn={userSettingsModalActive}>
        <UserSettingsModal handler={handleUserSettings} />
      </Modal>

      {/* Info Modal */}
      <Modal activeOn={infoModalActive}>
        <InfoModal handler={handleInfo} />
      </Modal>

      <Header handler={handleUserSettings} />

      <div className="page-container">
        <TripsList />
      </div>

      <InfoTab handler={handleInfo} />

      <CornerActionButton
        text="Add Trip"
        Icon={IoAddCircle}
        clickAction={() => {
          handleAddTrip({ action: "OPEN" });
        }}
      />
    </div>
  );
};

export default Home;
