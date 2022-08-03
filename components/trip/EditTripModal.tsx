/** @format */

import { useContext, useEffect, useState } from "react";

import { TripDataContext } from "../../context/TripDataContext";
import { UiContext } from "../../context/UiContext";

import InputWrapper from "../core/InputWrapper";
import Modal from "../core/Modal";
import ModalTitle from "../core/ModalTitle";
import TextInputField from "../core/TextInputField";
import ColorPicker from "../common/ColorPicker";
import PillButtonsRow from "../common/PillButtonsRow";
import NoModifySharedBanner from "./noModifySharedBanner";

interface IEditTripModal {}
const EditTripModal = ({}: IEditTripModal) => {
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const currentActiveTrip = useContext(TripDataContext).currentTrip;
  const editTripUiHandler = useContext(UiContext).handleEditTrip;
  const editTripDetailsHandler = useContext(TripDataContext).editTripDetails;

  const [tripNameInput, setTripNameInput] = useState<string>(getInitialTitle());
  const [tripThemeInput, setTripThemeInput] = useState<string>(
    getInitialThemeId()
  );

  function getInitialTitle() {
    if (currentActiveTrip) {
      return currentActiveTrip.title;
    } else return "Loading";
  }
  function getInitialThemeId() {
    if (currentActiveTrip) {
      return currentActiveTrip.themeId;
    } else return "init-1";
  }

  function close() {
    editTripUiHandler({ action: "CLOSE" });
  }

  function saveTrip() {
    // error Check
    if (currentActiveTrip && tripNameInput.length > 0) {
      if (currentActiveTrip.owned === true) {
        editTripUiHandler({ action: "CLOSE" });
        editTripDetailsHandler(tripNameInput, tripThemeInput).catch((err) =>
          console.error(err)
        );
      }
    }
  }

  function deleteTrip() {
    editTripUiHandler({ action: "CLOSE" });
    editTripDetailsHandler(tripNameInput, tripThemeInput, true).catch((err) =>
      console.error(err)
    );
  }

  useEffect(() => {
    if (currentActiveTrip) {
      setTripNameInput(currentActiveTrip.title);
      setTripThemeInput(currentActiveTrip.themeId);
    }
  }, [currentActiveModal]);

  if (currentActiveModal === "EDIT_TRIP") {
    return (
      <Modal>
        <ModalTitle text={"Edit trip details"} />
        <InputWrapper inputType="TEXT" captionText="Trip Name">
          <TextInputField
            text={tripNameInput}
            onChangeHandler={setTripNameInput}
            errorText={"Name can't be empty"}
          />
        </InputWrapper>
        <InputWrapper inputType="COLOR" captionText="Theme">
          <ColorPicker
            currentColor={tripThemeInput}
            onColorChange={setTripThemeInput}
          />
        </InputWrapper>
        <NoModifySharedBanner />
        <PillButtonsRow
          useIcons={true}
          iconsSize={"MEDIUM"}
          arrangement={"ROW"}
          outlineButtonText="Cancel"
          outlineButtonAction={close}
          dangerButtonText={"Delete"}
          dangerButtonAction={deleteTrip}
          fillButtonText={"save"}
          fillButtonAction={saveTrip}
        />
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default EditTripModal;
