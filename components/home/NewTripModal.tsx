/** @format */

import { useContext, useState, useEffect } from "react";

import { TripDataContext } from "../../context/TripDataContext";
import { UiContext } from "../../context/UiContext";

import { getRandomTripTitle } from "../../lib/util/sampleData";
import { getRandomCurrentColorOption } from "../../lib/util/theme";

import InputCaptionText from "../core/InputCaptionText";
import InputWrapper from "../core/InputWrapper";
import Modal from "../core/Modal";
import ModalTitle from "../core/ModalTitle";
import PillButton from "../core/PillButton";
import TextInputField from "../core/TextInputField";
import ColorPicker from "../common/ColorPicker";

const NewTripModal = () => {
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const newTripUiHandler = useContext(UiContext).handleNewTrip;
  const newTripDataHandler = useContext(TripDataContext).addNewTrip;

  const [tripNameInput, setTripNameInput] = useState<string>(
    getRandomTripTitle()
  );
  const [tripThemeInput, setTripThemeInput] = useState<string>(
    getRandomCurrentColorOption().id
  );

  function close() {
    newTripUiHandler({ action: "CLOSE" });
  }

  function saveTrip() {
    // error Check
    if (tripNameInput.length > 0) {
      newTripUiHandler({ action: "CLOSE" });
      newTripDataHandler(tripNameInput, tripThemeInput).catch((err) =>
        console.error(err)
      );
    }
  }

  useEffect(() => {
    setTripNameInput(getRandomTripTitle());
    setTripThemeInput(getRandomCurrentColorOption().id);
  }, [currentActiveModal]);

  if (currentActiveModal === "NEW_TRIP") {
    return (
      <Modal>
        <ModalTitle text={"Add a new trip"} />
        <InputWrapper inputType="TEXT" captionText="New Trip">
          <TextInputField
            type={"TEXT"}
            text={tripNameInput}
            onChangeHandler={setTripNameInput}
            errorText={"Name can't be empty"}
          />
        </InputWrapper>
        <InputWrapper inputType="TEXT" captionText="Theme">
          <ColorPicker
            currentColor={tripThemeInput}
            onColorChange={setTripThemeInput}
          />
        </InputWrapper>
        <div className="w-full flex items-center justify-evenly gap-2 mt-8">
          <PillButton
            text={"Cancel"}
            type={"OUTLINE"}
            size={"SMALL"}
            onClickAction={close}
          />
          <PillButton
            text={"Save"}
            type={"FILL"}
            size={"SMALL"}
            onClickAction={saveTrip}
          />
        </div>
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default NewTripModal;
