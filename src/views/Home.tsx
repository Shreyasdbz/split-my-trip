/** @format */

import { useState, useContext, useEffect } from "react";
import { IoAddCircle } from "react-icons/io5";

import { NewTripTypes, UserSettingsType } from "../interfaces/homeView";
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

const Home = () => {
  const addTripFunction = useContext(TripsContext).addTrip;
  const refreshTripsFunction = useContext(TripsContext).refreshTrips;
  const toggleThemeFunction = useContext(ThemeContext).toggleTheme;

  const [addTripModalActive, setaddTripModalActive] = useState(false);
  const [userSettingsModalActive, setUserSettingsModalActive] = useState(false);

  const handleAddTrip = async (payload: NewTripTypes) => {
    if (payload.action === "OPEN") {
      // Open the modal
      setaddTripModalActive(true);
    } else if (payload.action === "CLOSE") {
      // Close the modal
      setaddTripModalActive(false);
    } else if (payload.action === "CONFIRM") {
      // Pack and send the object to firestore
      setaddTripModalActive(false);
      addTripFunction(payload.title, payload.colorId);
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

  useEffect(() => {
    refreshTripsFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page home-page">
      {(addTripModalActive || userSettingsModalActive) && (
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

      <Header handler={handleUserSettings} />

      <div className="page-container">
        <TripsList />
      </div>

      <InfoTab />
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
