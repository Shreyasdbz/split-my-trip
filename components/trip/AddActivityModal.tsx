/** @format */

import { useState, useContext, useEffect } from "react";

import { UiContext } from "../../context/UiContext";
import { TripDataContext } from "../../context/TripDataContext";

import { getRandomPersonName, getRandomCost } from "../../lib/util/sampleData";

import PillButtonsRow from "../common/PillButtonsRow";
import InputWrapper from "../core/InputWrapper";
import Modal from "../core/Modal";
import ModalTitle from "../core/ModalTitle";
import TextInputField from "../core/TextInputField";
import NumberInputField from "../core/NumberInputField";
import NoModifySharedBanner from "./noModifySharedBanner";

const AddActivityModal = () => {
  const currentActiveTrip = useContext(TripDataContext).currentTrip;
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const newActivityUiHandler = useContext(UiContext).handleAddActivity;

  const [titleInput, setTitleInput] = useState(getRandomPersonName());
  const [costInput, setCostInput] = useState<number>(getRandomCost());

  function close() {
    newActivityUiHandler({ action: "CLOSE" });
  }

  function saveActivity() {
    if (currentActiveTrip && currentActiveTrip.owned === true) {
      //error checking
      if (costInput > 0) {
        newActivityUiHandler({ action: "CLOSE" });
      }
    }
  }

  useEffect(() => {
    setTitleInput(getRandomPersonName());
    setCostInput(getRandomCost());
  }, [currentActiveModal]);

  if (currentActiveModal === "ADD_ACTIVITY") {
    return (
      <Modal>
        <ModalTitle text={"Add new activity"} />
        <InputWrapper
          inputType={"TEXT"}
          captionText={"activity name"}
          compact={true}
        >
          <TextInputField
            text={titleInput}
            onChangeHandler={setTitleInput}
            errorText={"Name can't be empty"}
          />
        </InputWrapper>
        <InputWrapper
          inputType={"NUMBER"}
          captionText={"activity cost"}
          compact={true}
        >
          <NumberInputField
            text={costInput}
            onChangeHandler={setCostInput}
            errorText={"Cost can't be empty"}
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
          fillButtonAction={saveActivity}
        />
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default AddActivityModal;
