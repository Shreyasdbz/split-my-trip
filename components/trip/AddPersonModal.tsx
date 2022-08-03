/** @format */

import { useState, useContext, useEffect } from "react";

import { UiContext } from "../../context/UiContext";
import { TripDataContext } from "../../context/TripDataContext";

import { getRandomPersonName } from "../../lib/util/sampleData";

import PillButtonsRow from "../common/PillButtonsRow";
import InputWrapper from "../core/InputWrapper";
import Modal from "../core/Modal";
import ModalTitle from "../core/ModalTitle";
import TextInputField from "../core/TextInputField";
import NoModifySharedBanner from "./noModifySharedBanner";

const AddPersonModal = () => {
  const currentActiveTrip = useContext(TripDataContext).currentTrip;
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const newPersonUiHandler = useContext(UiContext).handleAddPerson;

  const [nameInput, setNameInput] = useState(getRandomPersonName());

  function close() {
    newPersonUiHandler({ action: "CLOSE" });
  }

  function savePerson() {
    if (currentActiveTrip && currentActiveTrip.owned === true) {
      // error checking
      if (nameInput.length > 0) {
        newPersonUiHandler({ action: "CLOSE" });
      }
    }
  }

  useEffect(() => {
    setNameInput(getRandomPersonName());
  }, [currentActiveModal]);

  if (currentActiveModal === "ADD_PERSON") {
    return (
      <Modal>
        <ModalTitle text={"Add new person"} />
        <InputWrapper inputType={"TEXT"} captionText={"person name"}>
          <TextInputField
            text={nameInput}
            onChangeHandler={setNameInput}
            errorText={"Name can't be empty"}
          />
        </InputWrapper>
        <NoModifySharedBanner />
        <PillButtonsRow
          useIcons={true}
          iconsSize={"MEDIUM"}
          arrangement={"ROW"}
          outlineButtonText="Cancel"
          outlineButtonAction={close}
          fillButtonText={"save"}
          fillButtonAction={savePerson}
        />
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default AddPersonModal;
