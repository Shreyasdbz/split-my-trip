/** @format */

import { useContext } from "react";

import { UiContext } from "../../context/UiContext";

import Modal from "../core/Modal";

const UserSettingsModal = () => {
  const userSettingsModalState = useContext(UiContext).userSettingsModalActive;
  const changeAction = useContext(UiContext).changeUserSettingsModal;

  if (userSettingsModalState === true) {
    return (
      <Modal>
        <div>Hi !</div>
        <button onClick={() => changeAction({ action: "CLOSE" })}>Close</button>
        <button>Sign Out</button>
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default UserSettingsModal;
