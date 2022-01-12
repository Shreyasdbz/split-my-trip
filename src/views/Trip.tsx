/** @format */

import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { TripsContext } from "../context/TripsContext";
import {
  EditTripTypes,
  AddPersonTypes,
  EditPersonTypes,
  AddActivityTypes,
} from "../interfaces/tripView";
import { TripType, PersonType } from "../interfaces/tripObjects";

import Header from "../components/trip/Header";
import EditTripButton from "../components/trip/EditTripButton";
import PeopleSection from "../components/trip/PeopleSection";
import Modal from "../components/common/Modal";
import EditTripModal from "../components/trip/EditTripModal";
import AddPersonModal from "../components/trip/AddPersonModal";
import EditPersonModal from "../components/trip/EditPersonModal";
import AddActivityModal from "../components/trip/AddActivityModal";
import ActivitiesSection from "../components/trip/ActivitiesSection";

const Trip = () => {
  const getTripByIdFunction = useContext(TripsContext).getTripById;
  const updateTripFunction = useContext(TripsContext).updateTrip;
  const addPersonFunction = useContext(TripsContext).addPerson;
  const updatePersonFunction = useContext(TripsContext).updatePerson;
  const addActivityFunction = useContext(TripsContext).addActivity;

  let tripId = useParams().tripID;
  const trip = getTripByIdFunction(tripId);

  const [editTripModalActive, setEditTripModalActive] = useState(false);
  const [addPersonModalActive, setAddPersonModalActive] = useState(false);
  const [editPersonModalActive, setEditPersonModalActive] = useState(false);
  const [addActivityModalActive, setAddActivityModalActive] = useState(false);

  const [editPerson, setEditPerson] = useState<PersonType>({} as PersonType);

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
      updateTripFunction(tripEdit, payload.toDelete);
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
  function handleEditPerson(payload: EditPersonTypes) {
    if (payload.action === "OPEN") {
      setEditPerson(payload.person);
      setEditPersonModalActive(true);
    } else if (payload.action === "CLOSE") {
      setEditPersonModalActive(false);
    } else if (payload.action === "CONFIRM") {
      updatePersonFunction(trip.id, payload.person, payload.toDelete);
      setEditPerson({} as PersonType);
      setEditPersonModalActive(false);
    }
  }

  function handleAddActivity(payload: AddActivityTypes) {
    if (payload.action === "OPEN") {
      setAddActivityModalActive(true);
    } else if (payload.action === "CLOSE") {
      setAddActivityModalActive(false);
    } else if (payload.action === "CONFIRM") {
      // TODO: Change how participant list is packaged
      addActivityFunction(trip.id, payload.activity);
      setAddActivityModalActive(false);
    }
  }
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

      {/* Edit Person Modal */}
      <Modal activeOn={editPersonModalActive}>
        <EditPersonModal person={editPerson} handler={handleEditPerson} />
      </Modal>

      {/* Add Activity Modal */}
      <Modal activeOn={addActivityModalActive}>
        <AddActivityModal handler={handleAddActivity} />
      </Modal>

      {(editTripModalActive ||
        addPersonModalActive ||
        editPersonModalActive ||
        addActivityModalActive) && <div className="blur-layer" />}

      <div className="page-container">
        <EditTripButton handler={handleEditTrip} />
        <PeopleSection
          addHandler={handleAddPerson}
          editHandler={handleEditPerson}
        />
        <ActivitiesSection addHandler={handleAddActivity} />
      </div>
    </div>
  );
};

export default Trip;
