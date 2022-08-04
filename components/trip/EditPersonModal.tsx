/** @format */

import { useState, useContext, useEffect } from "react";

import { UiContext } from "../../context/UiContext";
import { TripDataContext } from "../../context/TripDataContext";

import PillButtonsRow from "../common/PillButtonsRow";
import InputWrapper from "../core/InputWrapper";
import Modal from "../core/Modal";
import ModalTitle from "../core/ModalTitle";
import TextInputField from "../core/TextInputField";
import NoModifySharedBanner from "./noModifySharedBanner";

const EditPersonModal = () => {
  const currentActiveTrip = useContext(TripDataContext).currentTrip;
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const currentPersonEdit = useContext(TripDataContext).currentPersonEditId;
  const getPersonById = useContext(TripDataContext).getPersonById;

  const editPersonUiHandler = useContext(UiContext).handleEditPerson;
  const editPersonDataHandler = useContext(TripDataContext).editPerson;

  const [nameInput, setNameInput] = useState(getNamePlaceHolder);

  function getNamePlaceHolder(): string {
    let final = "name";
    if (currentPersonEdit) final = getPersonById(currentPersonEdit);
    return final;
  }

  function close() {
    editPersonUiHandler({ action: "CLOSE" });
  }

  function savePerson() {
    if (
      currentActiveTrip &&
      currentPersonEdit &&
      currentActiveTrip.owned === true
    ) {
      // error checking
      if (nameInput.length > 0) {
        editPersonDataHandler({ action: "SAVE" }, currentPersonEdit, nameInput);
        editPersonUiHandler({ action: "CLOSE" });
      }
    }
  }

  function deletePerson() {
    if (
      currentActiveTrip &&
      currentPersonEdit &&
      currentActiveTrip.owned === true
    ) {
      // error checking
      if (nameInput.length > 0) {
        editPersonDataHandler({ action: "DELETE" }, currentPersonEdit);
        editPersonUiHandler({ action: "CLOSE" });
      }
    }
  }

  useEffect(() => {
    setNameInput(getNamePlaceHolder());
  }, [currentActiveModal]);

  if (currentActiveModal === "EDIT_PERSON") {
    return (
      <Modal>
        <ModalTitle text={"Edit person"} />
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
          dangerButtonText={"Delete"}
          dangerButtonAction={deletePerson}
          fillButtonText={"save"}
          fillButtonAction={savePerson}
        />
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default EditPersonModal;
