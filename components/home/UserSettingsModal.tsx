/** @format */

import { useContext } from "react";

import { UiContext } from "../../context/UiContext";
import { TripDataContext } from "../../context/TripDataContext";
import { FirebaseAuth } from "../../lib/firebase/auth";

import Modal from "../core/Modal";
import ModalTitle from "../core/ModalTitle";
import PillButton from "../core/PillButton";
import Image from "next/image";

const UserSettingsModal = () => {
  const currentUser = useContext(TripDataContext).currentUser;
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const userSettingsHandler = useContext(UiContext).handleUserSettings;
  const dimissAll = useContext(UiContext).dismissAllModals;

  function closeUserSettings() {
    userSettingsHandler({ action: "CLOSE" });
  }

  function signOut() {
    dimissAll();
    FirebaseAuth.useSignOut();
  }

  if (currentActiveModal === "USER_SETTINGS") {
    return (
      <Modal>
        <ModalTitle text="Settings" />
        <div className="flex items-center justify-center my-2">
          <div className="h-24 w-24 relative shadow-lg rounded-full">
            {currentUser?.photoURL && (
              <Image
                src={currentUser.photoURL}
                layout="fill"
                className="rounded-full"
              />
            )}
          </div>
        </div>
        <div className="mb-4 w-full flex items-center justify-center text-lg">
          Hi, <strong className="ml-1">{currentUser?.displayName}</strong>!{" "}
        </div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <a
            href="https://www.github.com/shreyasdbz/split-my-trip"
            target={"_blank"}
          >
            <PillButton
              text="Info"
              type="FILL"
              size="MEDIUM"
              onClickAction={() => {}}
            />
          </a>
          <PillButton
            text="Sign Out"
            type="DANGER"
            size="MEDIUM"
            onClickAction={signOut}
          />
          <PillButton
            text="Close"
            type="OUTLINE"
            size="MEDIUM"
            onClickAction={closeUserSettings}
          />
        </div>
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default UserSettingsModal;
