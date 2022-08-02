/** @format */

import { useContext } from "react";

import { UiContext } from "../../context/UiContext";

import Modal from "../core/Modal";

const NewTripModal = () => {
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const handler = useContext(UiContext).handleNewTrip;

  if (currentActiveModal === "NEW_TRIP") {
    return (
      <Modal>
        <div>Add a new Trip</div>
        <button onClick={() => handler()}>Close</button>
        <button>Sign Out</button>
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default NewTripModal;
