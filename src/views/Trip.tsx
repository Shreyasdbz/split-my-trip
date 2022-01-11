/** @format */

import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { TripsContext } from "../context/TripsContext";
import { EditTripTypes } from "../interfaces/tripView";

import Header from "../components/trip/Header";
import EditTripButton from "../components/trip/EditTripButton";
import PeopleSection from "../components/trip/PeopleSection";
import Modal from "../components/common/Modal";
import EditTripModal from "../components/trip/EditTripModal";

const Trip = () => {
  let tripId = useParams().tripID;
  const getTripByIdFunction = useContext(TripsContext).getTripById;
  const trip = getTripByIdFunction(tripId);

  const [editTripModalActive, setEditTripModalActive] = useState(false);

  function handleEditTrip(payload: EditTripTypes) {
    if (payload.action === "OPEN") {
      setEditTripModalActive(true);
      //
    } else if (payload.action === "CLOSE") {
      setEditTripModalActive(false);
      //
    } else if (payload.action === "CONFIRM") {
      setEditTripModalActive(false);
      //
    }
  }

  return (
    <div className="page trip-page">
      <Header title={trip.title} colorId={trip.colorId} />
      <Modal activeOn={editTripModalActive}>
        <EditTripModal handler={handleEditTrip} />
      </Modal>
      {editTripModalActive && <div className="blur-layer" />}
      <div className="page-container">
        <EditTripButton handler={handleEditTrip} />
        <PeopleSection />
      </div>
    </div>
  );
};

export default Trip;
