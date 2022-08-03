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
import PillButtonsRow from "../common/PillButtonsRow";

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
        <PillButtonsRow
          useIcons={true}
          iconsSize={"MEDIUM"}
          arrangement={"ROW"}
          outlineButtonText={"CANCEL"}
          outlineButtonAction={close}
          fillButtonText={"SAVE"}
          fillButtonAction={saveTrip}
        />
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default NewTripModal;
