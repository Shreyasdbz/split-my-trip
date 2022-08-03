/** @format */

import { useState, useContext, useEffect } from "react";

import { UiContext } from "../../context/UiContext";

import { getRandomPersonName } from "../../lib/util/sampleData";

import PillButtonsRow from "../common/PillButtonsRow";
import InputWrapper from "../core/InputWrapper";
import Modal from "../core/Modal";
import ModalTitle from "../core/ModalTitle";
import TextInputField from "../core/TextInputField";

const AddPersonModal = () => {
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const newPersonUiHandler = useContext(UiContext).handleAddPerson;

  const [nameInput, setNameInput] = useState(getRandomPersonName());

  function close() {
    newPersonUiHandler({ action: "CLOSE" });
  }

  function savePerson() {
    newPersonUiHandler({ action: "CLOSE" });
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
