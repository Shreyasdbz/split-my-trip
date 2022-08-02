/** @format */

import { useContext } from "react";

import { UiContext } from "../../context/UiContext";

import Modal from "../core/Modal";

const UserSettingsModal = () => {
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const handler = useContext(UiContext).handleUserSettings;

  if (currentActiveModal === "USER_SETTINGS") {
    return (
      <Modal>
        <div>Hi !</div>
        <button onClick={() => handler({ action: "CLOSE" })}>Close</button>
        <button>Sign Out</button>
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default UserSettingsModal;
