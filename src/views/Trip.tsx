/** @format */

import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { TripsContext } from "../context/TripsContext";
import { HandleEditTripTypes } from "../interfaces/tripView";

import Header from "../components/trip/Header";
import EditTripButton from "../components/trip/EditTripButton";
import PeopleSection from "../components/trip/PeopleSection";
// import { getTripColorById } from "../helpers/colors";

const Trip = () => {
  let tripId = useParams().tripID;
  const getTripByIdFunction = useContext(TripsContext).getTripById;
  const trip = getTripByIdFunction(tripId);

  const [editTripModalActive, setEditTripModalActive] = useState(false);

  function handleEditTrip(payload: HandleEditTripTypes) {
    if (payload.action === "OPEN") {
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
      {editTripModalActive && <div className="blur-layer" />}
      <div className="page-container">
        <EditTripButton />
        <PeopleSection />
      </div>
    </div>
  );
};

export default Trip;
