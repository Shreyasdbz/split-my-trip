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

interface IEditTripModal {}
const EditTripModal = ({}: IEditTripModal) => {
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const currentActiveTrip = useContext(TripDataContext).currentTrip;
  const editTripUiHandler = useContext(UiContext).handleEditTrip;
  const editTripDetailsHandler = useContext(TripDataContext).editTripDetails;

  const [tripNameInput, setTripNameInput] = useState<string>(
    currentActiveTrip.title
  );
  const [tripThemeInput, setTripThemeInput] = useState<string>(
    currentActiveTrip.themeId
  );

  function close() {
    editTripUiHandler({ action: "CLOSE" });
  }

  function saveTrip() {
    // error Check
    if (tripNameInput.length > 0) {
      editTripUiHandler({ action: "CLOSE" });
      editTripDetailsHandler().catch((err) => console.error(err));
    }
  }

  function deleteTrip() {
    editTripUiHandler({ action: "CLOSE" });
    editTripDetailsHandler().catch((err) => console.error(err));
  }

  useEffect(() => {
    setTripNameInput(currentActiveTrip.title);
    setTripThemeInput(currentActiveTrip.themeId);
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
