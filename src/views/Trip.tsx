/** @format */

import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { TripsContext } from "../context/TripsContext";
import { EditTripTypes, AddPersonTypes } from "../interfaces/tripView";
import { TripType } from "../interfaces/tripObjects";

import Header from "../components/trip/Header";
import EditTripButton from "../components/trip/EditTripButton";
import PeopleSection from "../components/trip/PeopleSection";
import Modal from "../components/common/Modal";
import EditTripModal from "../components/trip/EditTripModal";
import AddPersonModal from "../components/trip/AddPersonModal";

const Trip = () => {
  const getTripByIdFunction = useContext(TripsContext).getTripById;
  const updateTripFunction = useContext(TripsContext).updateTrip;
  const addPersonFunction = useContext(TripsContext).addPerson;

  let tripId = useParams().tripID;
  const trip = getTripByIdFunction(tripId);

  const [editTripModalActive, setEditTripModalActive] = useState(false);
  const [addPersonModalActive, setAddPersonModalActive] = useState(false);
  // const [editPersonModalActive, setEditPersonModalActive] = useState(false)
  // const [newActivityModalActive, setNewActivityModalActive] = useState(false)
  // const [editActivityModalActive, setEditActivityModalActive] = useState(false)

  function handleEditTrip(payload: EditTripTypes) {
    if (payload.action === "OPEN") {
      setEditTripModalActive(true);
    } else if (payload.action === "CLOSE") {
      setEditTripModalActive(false);
    } else if (payload.action === "CONFIRM") {
      let tripEdit: TripType = {
        id: trip.id,
        title: payload.title,
        colorId: payload.colorId,
        peopleList: trip.peopleList,
        activityList: trip.activityList,
      };
      updateTripFunction(tripEdit, payload.deleteTrip);
      setEditTripModalActive(false);
    }
  }

  function handleAddPerson(payload: AddPersonTypes) {
    if (payload.action === "OPEN") {
      setAddPersonModalActive(true);
    } else if (payload.action === "CLOSE") {
      setAddPersonModalActive(false);
    } else if (payload.action === "CONFIRM") {
      addPersonFunction(trip.id, payload.name);
      setAddPersonModalActive(false);
    }
  }
  // function handleEditPerson() {
  //   //
  // }

  // function handleNewActivity() {
  //   //
  // }
  // function handleEditActivity() {
  //   //
  // }

  // function handleSplit() {
  //   //
  // }

  return (
    <div className="page trip-page">
      <Header title={trip.title} colorId={trip.colorId} />
      {/* Edit Trip Modal */}
      <Modal activeOn={editTripModalActive}>
        <EditTripModal handler={handleEditTrip} />
      </Modal>
      {/* New Person Modal */}
      <Modal activeOn={addPersonModalActive}>
        <AddPersonModal handler={handleAddPerson} />
      </Modal>
      {(editTripModalActive || addPersonModalActive) && (
        <div className="blur-layer" />
      )}
      <div className="page-container">
        <EditTripButton handler={handleEditTrip} />
        <PeopleSection addHandler={handleAddPerson} />
      </div>
    </div>
  );
};

export default Trip;
