/** @format */

import { useContext, useEffect, useState } from "react";
import { XIcon, TrashIcon, SaveIcon } from "@heroicons/react/solid";

import { TripDataContext } from "../../context/TripDataContext";
import { UiContext } from "../../context/UiContext";

import InputCaptionText from "../core/InputCaptionText";
import InputWrapper from "../core/InputWrapper";
import Modal from "../core/Modal";
import ModalTitle from "../core/ModalTitle";
import PillButton from "../core/PillButton";
import TextInputField from "../core/TextInputField";
import ColorPicker from "../common/ColorPicker";

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
            type={"TEXT"}
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
        <div className="w-full flex items-center justify-evenly gap-2 mt-8">
          <PillButton
            label="Cancel Button"
            text={"Cancel"}
            type={"OUTLINE"}
            size={"SMALL"}
            onClickAction={close}
          >
            <XIcon className="w-5 h-5" />
          </PillButton>
          <PillButton
            label="Delete Button"
            text={"Delete"}
            type={"DANGER"}
            size={"SMALL"}
            onClickAction={deleteTrip}
          >
            <TrashIcon className="w-5 h-5" />
          </PillButton>
          <PillButton
            label="Save Button"
            text={"Save"}
            type={"FILL"}
            size={"SMALL"}
            onClickAction={saveTrip}
          >
            <SaveIcon className="w-5 h-5" />
          </PillButton>
        </div>
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default EditTripModal;
