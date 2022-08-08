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
import ToggleList from "./ToggleList";

const AddActivityModal = () => {
  const currentActiveTrip = useContext(TripDataContext).currentTrip;
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const newActivityUiHandler = useContext(UiContext).handleAddActivity;
  const newActivityDataHandler = useContext(TripDataContext).addActivity;

  const [titleInput, setTitleInput] = useState(getRandomPersonName());
  const [costInput, setCostInput] = useState<number>(getRandomCost());
  const [payerIdInput, setPayerIdInput] = useState<string>(
    selectRandomPayerId()
  );
  const [personItemList, setPersonItemList] = useState<IDropDownItem[]>(
    convertPersonToItemList()
  );
  const [participantItemList, setParticipantItemList] = useState<
    IToggleListItem[]
  >(convertToParticipantItemList());

  function close() {
    newActivityUiHandler({ action: "CLOSE" });
  }

  function saveActivity() {
    if (currentActiveTrip && currentActiveTrip.owned === true) {
      //error checking
      if (
        costInput > 0 &&
        costInput &&
        titleInput &&
        payerIdInput &&
        participantItemList
      ) {
        // Convert participantItemList to participantList
        let tempParticipantList: IActivityParticipant[] = [];
        for (let i of participantItemList) {
          tempParticipantList.push({
            participantId: i.id,
            isParticipating: i.currentState,
          });
        }
        let activityObj: Omit<ITripActivity, "id"> = {
          title: titleInput,
          cost: costInput,
          payerId: payerIdInput,
          participantList: tempParticipantList,
        };
        newActivityDataHandler(activityObj);

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

  interface IToggleListItem {
    id: string;
    description: string;
    currentState: boolean;
    isDisabled?: boolean;
  }
  function convertToParticipantItemList(): IToggleListItem[] {
    const itemList: IToggleListItem[] = [];
    if (!currentActiveTrip || !currentActiveTrip.personList) return itemList;
    for (let p of currentActiveTrip.personList) {
      itemList.push({
        id: p.id,
        description: p.name,
        currentState: true,
      });
    }
    return itemList;
  }

  function handleParticipantToggle(id: string) {
    if (participantItemList.length > 0) {
      let tempList: IToggleListItem[] = [];
      for (let i of participantItemList) {
        if (i.id === id) {
          i.currentState = !i.currentState;
        }
        tempList.push(i);
      }
      setParticipantItemList(tempList);
    }
  }

  useEffect(() => {
    setTitleInput(getRandomPersonName());
    setCostInput(getRandomCost());
    setPayerIdInput(selectRandomPayerId());
    setPersonItemList(convertPersonToItemList());
    setParticipantItemList(convertToParticipantItemList());
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
        <InputWrapper
          inputType={"DROPDOWN"}
          captionText={"participants"}
          compact={false}
        >
          <ToggleList
            items={participantItemList}
            onItemToggle={handleParticipantToggle}
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
