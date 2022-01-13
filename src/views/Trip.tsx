/** @format */

import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { IoPieChart } from "react-icons/io5";

import { TripType, PersonType, ActivityType } from "../interfaces/tripObjects";
import { SplitType } from "../interfaces/splitObjects";
import {
  EditTripTypes,
  AddPersonTypes,
  EditPersonTypes,
  AddActivityTypes,
  EditActivityTypes,
  SplitModalTypes,
} from "../interfaces/tripView";
import { TripsContext } from "../context/TripsContext";
import { ThemeContext } from "../context/ThemeContext";
import { buildSplitsList, calculateTotalCost } from "../helpers/splits";

import Header from "../components/trip/Header";
import EditTripButton from "../components/trip/EditTripButton";
import PeopleSection from "../components/trip/PeopleSection";
import Modal from "../components/common/Modal";
import EditTripModal from "../components/trip/EditTripModal";
import AddPersonModal from "../components/trip/AddPersonModal";
import EditPersonModal from "../components/trip/EditPersonModal";
import AddActivityModal from "../components/trip/AddActivityModal";
import ActivitiesSection from "../components/trip/ActivitiesSection";
import EditActivityModal from "../components/trip/EditActivityModal";
import CornerActionButton from "../components/common/CornerActionButton";
import SplitsModal from "../components/trip/SplitsModal";

const Trip = () => {
  const theme = useContext(ThemeContext).theme;
  const getTripByIdFunction = useContext(TripsContext).getTripById;
  const updateTripFunction = useContext(TripsContext).updateTrip;
  const addPersonFunction = useContext(TripsContext).addPerson;
  const updatePersonFunction = useContext(TripsContext).updatePerson;
  const addActivityFunction = useContext(TripsContext).addActivity;
  const updateActivityFunction = useContext(TripsContext).updateActivity;

  let tripId = useParams().tripID;
  const trip = getTripByIdFunction(tripId);

  const [editTripModalActive, setEditTripModalActive] = useState(false);
  const [addPersonModalActive, setAddPersonModalActive] = useState(false);
  const [editPersonModalActive, setEditPersonModalActive] = useState(false);
  const [addActivityModalActive, setAddActivityModalActive] = useState(false);
  const [editActivityModalActive, setEditActivityModalActive] = useState(false);
  const [splitsModalActive, setSplitsModalActive] = useState(false);

  const [editPerson, setEditPerson] = useState<PersonType>({} as PersonType);
  const [editActivity, setEditActivity] = useState<ActivityType>(
    {} as ActivityType
  );
  const [splitsList, setSplitsList] = useState<SplitType[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  function handleEditTrip(payload: EditTripTypes) {
    if (payload.action === "OPEN") {
      setEditTripModalActive(true);
    } else if (payload.action === "CLOSE") {
      setEditTripModalActive(false);
    } else if (payload.action === "CONFIRM") {
      let errorMessage = "";
      if (payload.title.length < 2) {
        errorMessage = "Please enter a minimum of 2 characters";
      }
      if (errorMessage === "") {
        let tripEdit: TripType = {
          id: trip.id,
          title: payload.title,
          colorId: payload.colorId,
          peopleList: trip.peopleList,
          activityList: trip.activityList,
        };
        updateTripFunction(tripEdit, payload.toDelete);
        setEditTripModalActive(false);
      } else {
        alert(errorMessage);
      }
    }
  }

  function handleAddPerson(payload: AddPersonTypes) {
    if (payload.action === "OPEN") {
      setAddPersonModalActive(true);
    } else if (payload.action === "CLOSE") {
      setAddPersonModalActive(false);
    } else if (payload.action === "CONFIRM") {
      let errorMessage = "";
      if (payload.name.length < 2) {
        errorMessage = "Please enter a minimum of 2 characters";
      }
      if (errorMessage === "") {
        addPersonFunction(trip.id, payload.name);
        setAddPersonModalActive(false);
      } else {
        alert(errorMessage);
      }
    }
  }
  function handleEditPerson(payload: EditPersonTypes) {
    if (payload.action === "OPEN") {
      setEditPerson(payload.person);
      setEditPersonModalActive(true);
    } else if (payload.action === "CLOSE") {
      setEditPersonModalActive(false);
    } else if (payload.action === "CONFIRM") {
      let errorMessage = "";
      if (payload.person.name.length < 2) {
        errorMessage = "Please enter a minimum of 2 characters";
      }
      if (errorMessage === "") {
        updatePersonFunction(trip.id, payload.person, payload.toDelete);
        setEditPerson({} as PersonType);
        setEditPersonModalActive(false);
      } else {
        alert(errorMessage);
      }
    }
  }

  function handleAddActivity(payload: AddActivityTypes) {
    if (payload.action === "OPEN") {
      setAddActivityModalActive(true);
    } else if (payload.action === "CLOSE") {
      setAddActivityModalActive(false);
    } else if (payload.action === "CONFIRM") {
      let errorMessage = "";
      if (payload.activity.title.length < 2) {
        errorMessage = "Title must be a minimum of 2 characters";
      }
      if (isNaN(payload.activity.cost)) {
        errorMessage = "Invalid cost";
      }
      if (payload.activity.participantList.length < 1) {
        errorMessage = "Must have at least 1 participant";
      }
      if (errorMessage === "") {
        addActivityFunction(trip.id, payload.activity);
        setAddActivityModalActive(false);
      } else {
        alert(errorMessage);
      }
    }
  }
  function handleEditActivity(payload: EditActivityTypes) {
    if (payload.action === "OPEN") {
      setEditActivity(payload.activity);
      setEditActivityModalActive(true);
    } else if (payload.action === "CLOSE") {
      setEditActivityModalActive(false);
    } else if (payload.action === "CONFIRM") {
      let errorMessage = "";
      if (payload.activity.title.length < 2) {
        errorMessage = "Title must be a minimum of 2 characters";
      }
      if (isNaN(payload.activity.cost)) {
        errorMessage = "Invalid cost";
      }
      if (payload.activity.participantList.length < 1) {
        errorMessage = "Must have at least 1 participant";
      }
      if (errorMessage === "") {
        setEditActivity({} as ActivityType);
        updateActivityFunction(trip.id, payload.activity, payload.toDelete);
        setEditActivityModalActive(false);
      } else {
        alert(errorMessage);
      }
    }
  }

  function handleSplits(payload: SplitModalTypes) {
    if (payload.action === "OPEN") {
      let splitsListDerived = buildSplitsList(trip);
      setSplitsList(splitsListDerived);
      let totalCostDerived = calculateTotalCost(trip);
      setTotalCost(totalCostDerived);
      setTimeout(() => {
        setSplitsModalActive(true);
      }, 300);
    } else if (payload.action === "CLOSE") {
      setSplitsList([]);
      setSplitsModalActive(false);
    }
  }

  return (
    <div
      className="page trip-page"
      style={{
        backgroundColor: `${theme.background}`,
      }}
    >
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

      {/* Edit Activity Modal */}
      <Modal activeOn={editActivityModalActive}>
        <EditActivityModal
          activity={editActivity}
          handler={handleEditActivity}
        />
      </Modal>

      {/* Splits Modal */}
      <Modal activeOn={splitsModalActive}>
        <SplitsModal
          tripColorId={trip.colorId}
          splitsList={splitsList}
          totalCost={totalCost}
          handler={handleSplits}
        />
      </Modal>

      {(editTripModalActive ||
        addPersonModalActive ||
        editPersonModalActive ||
        addActivityModalActive ||
        editActivityModalActive ||
        splitsModalActive) && <div className="blur-layer" />}

      <div className="page-container">
        <EditTripButton handler={handleEditTrip} />
        <PeopleSection
          addHandler={handleAddPerson}
          editHandler={handleEditPerson}
        />
        {trip.peopleList.length > 0 ? (
          <ActivitiesSection
            addHandler={handleAddActivity}
            editHandler={handleEditActivity}
          />
        ) : (
          <div
            className="trip-view-section get-started-section"
            style={{ color: `${theme.greyText}` }}
          >
            <span>To get started,</span>
            <span>tap the '+ADD' icon above</span>
          </div>
        )}
      </div>
      <CornerActionButton
        text="Get Split"
        Icon={IoPieChart}
        clickAction={() => {
          handleSplits({ action: "OPEN" });
        }}
      />
    </div>
  );
};

export default Trip;
