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
import DropDownPicker from "../core/DropDownPicker";

const AddActivityModal = () => {
  const currentActiveTrip = useContext(TripDataContext).currentTrip;
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const newActivityUiHandler = useContext(UiContext).handleAddActivity;

  const [titleInput, setTitleInput] = useState(getRandomPersonName());
  const [costInput, setCostInput] = useState<number>(getRandomCost());
  const [personItemList, setPersonItemList] = useState<IDropDownItem[]>(
    convertPersonToItemList()
  );
  const [payerIdInput, setPayerIdInput] = useState<string>(
    selectRandomPayerId()
  );

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

  function selectRandomPayerId(): string {
    let payer = "";
    if (!currentActiveTrip || !currentActiveTrip.personList) return payer;
    let randomPick: ITripPerson =
      currentActiveTrip.personList[
        Math.floor(Math.random() * currentActiveTrip.personList.length)
      ];
    if (currentActiveTrip && currentActiveTrip.personList.length > 0) {
      payer = randomPick.id;
    }
    return payer;
  }

  interface IDropDownItem {
    id: string;
    description: string;
  }
  function convertPersonToItemList(): IDropDownItem[] {
    const itemList: IDropDownItem[] = [];
    if (!currentActiveTrip || !currentActiveTrip.personList) return itemList;
    for (let p of currentActiveTrip.personList) {
      itemList.push({
        id: p.id,
        description: p.name,
      });
    }
    return itemList;
  }

  function handlePayerSelect(id: string) {
    setPayerIdInput(id);
    setPersonItemList(convertPersonToItemList());
  }

  useEffect(() => {
    setTitleInput(getRandomPersonName());
    setCostInput(getRandomCost());
    setPayerIdInput(selectRandomPayerId());
    setPersonItemList(convertPersonToItemList());
  }, [currentActiveModal]);

  if (currentActiveModal === "ADD_ACTIVITY") {
    return (
      <Modal>
        <ModalTitle text={"Add new activity"} />
        <InputWrapper
          inputType={"TEXT"}
          captionText={"activity name"}
          compact={false}
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
          compact={false}
        >
          <NumberInputField
            text={costInput}
            onChangeHandler={setCostInput}
            errorText={"Cost can't be empty"}
          />
        </InputWrapper>
        <InputWrapper
          inputType={"DROPDOWN"}
          captionText={"payer"}
          compact={false}
        >
          <DropDownPicker
            itemList={personItemList}
            currentSelectedId={payerIdInput}
            onPick={handlePayerSelect}
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
