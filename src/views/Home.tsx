/** @format */

import { useState, useEffect } from "react";
import { IoAddCircle } from "react-icons/io5";

import { TripType } from "../interfaces/tripObjects";
import { NewTripTypes } from "../interfaces/homeView";
import { initialUserPrep } from "../helpers/user";

import Header from "../components/home/Header";
import TripsList from "../components/home/TripsList";
import CornerActionButton from "../components/common/CornerActionButton";
import InfoTab from "../components/common/InfoTab";
import Modal from "../components/common/Modal";
import NewTripModal from "../components/home/NewTripModal";

const Home = () => {
  const [tripsList, setTripsList] = useState<TripType[]>([]);
  const [newTripModalActive, setNewTripModalActive] = useState(false);

  const newTrip = async (payload: NewTripTypes) => {
    if (payload.action === "OPEN") {
      // Open the modal
      setNewTripModalActive(true);
    } else if (payload.action === "CLOSE") {
      // Close the modal
      setNewTripModalActive(false);
    } else if (payload.action === "CONFIRM") {
      // Pack and send the object to firestore
      setNewTripModalActive(false);
    }
  };

  useEffect(() => {
    initialUserPrep();
  }, []);

  return (
    <div className="page home-page">
      {newTripModalActive && <div className="blur-layer" />}
      <Modal activeOn={newTripModalActive}>
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
