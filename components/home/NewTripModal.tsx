/** @format */

import { useContext, useState } from "react";

import { UiContext } from "../../context/UiContext";
import InputCaptionText from "../core/InputCaptionText";
import InputWrapper from "../core/InputWrapper";

import Modal from "../core/Modal";
import ModalTitle from "../core/ModalTitle";
import PillButton from "../core/PillButton";
import TextInputField from "../core/TextInputField";

const NewTripModal = () => {
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const handler = useContext(UiContext).handleNewTrip;

  const [tripNameInput, setTripNameInput] = useState<string>("testName");

  function close() {
    handler({
      payload: {
        action: "CLOSE",
      },
    });
  }

  function saveTrip() {
    handler({
      payload: {
        action: "SAVE",
        newTripName: "test",
        newTripThemeId: "test-2",
      },
    });
  }

  if (currentActiveModal === "NEW_TRIP") {
    return (
      <Modal>
        <ModalTitle text={"Add a new trip"} />
        <InputWrapper>
          <InputCaptionText text="Trip Name" />
          <TextInputField
            type={"TEXT"}
            text={tripNameInput}
            onChangeHandler={setTripNameInput}
          />
        </InputWrapper>
        <InputWrapper>
          <InputCaptionText text="Theme" />
          <div>testlkasdfj aslfjk asdlkfj</div>
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
