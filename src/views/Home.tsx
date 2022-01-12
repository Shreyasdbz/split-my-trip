/** @format */

import { useState, useContext, useEffect } from "react";
import { IoAddCircle } from "react-icons/io5";

import { NewTripTypes } from "../interfaces/homeView";
import { TripsContext } from "../context/TripsContext";

import Header from "../components/home/Header";
import TripsList from "../components/home/TripsList";
import CornerActionButton from "../components/common/CornerActionButton";
import InfoTab from "../components/common/InfoTab";
import Modal from "../components/common/Modal";
import NewTripModal from "../components/home/NewTripModal";

const Home = () => {
  const [addTripModalActive, setaddTripModalActive] = useState(false);
  const addTripFunction = useContext(TripsContext).addTrip;
  const refreshTripsFunction = useContext(TripsContext).refreshTrips;

  const newTrip = async (payload: NewTripTypes) => {
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

  useEffect(() => {
    refreshTripsFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page home-page">
      {addTripModalActive && <div className="blur-layer" />}
      <Modal activeOn={addTripModalActive}>
        <NewTripModal handler={newTrip} />
      </Modal>
      <Header />
      <div className="page-container">
        <TripsList />
      </div>
      <InfoTab />
      <CornerActionButton
        text="Add Trip"
        Icon={IoAddCircle}
        clickAction={() => {
          newTrip({ action: "OPEN" });
        }}
      />
    </div>
  );
};

export default Home;
