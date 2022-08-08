/** @format */
import { useContext, useEffect, useState } from "react";

import { TripDataContext } from "../../context/TripDataContext";
import { UiContext } from "../../context/UiContext";

import Modal from "../core/Modal";
import ModalTitle from "../core/ModalTitle";
import PillButtonsRow from "../common/PillButtonsRow";
import DropDownPicker from "../core/DropDownPicker";
import InputWrapper from "../core/InputWrapper";
import NumberInputField from "../core/NumberInputField";
import TextInputField from "../core/TextInputField";
import NoModifySharedBanner from "./noModifySharedBanner";
import ToggleList from "./ToggleList";

const EditActivityModal = () => {
  const currentActiveTrip = useContext(TripDataContext).currentTrip;
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const currentActivityEditId =
    useContext(TripDataContext).currentActivityEditId;
  const editActivityUiHandler = useContext(UiContext).handleEditActivity;
  const editActivityDataHandler = useContext(TripDataContext).editActivity;
  const getPersonNameFunction = useContext(TripDataContext).getPersonById;
  const getActivityFunction = useContext(TripDataContext).getActivityById;

  const [titleInput, setTitleInput] = useState<string>(getTitle());
  const [costInput, setCostInput] = useState<number>(getCost());
  const [payerIdInput, setPayerIdInput] = useState<string>(getPayerId());
  const [personItemList, setPersonItemList] = useState<IDropDownItem[]>(
    getPersonItemList()
  );
  const [participantItemList, setParticipantItemList] = useState<
    IToggleListItem[]
  >(getParticipantItemList());

  function getTitle(): string {
    let final = "";
    if (
      !currentActiveTrip ||
      !currentActiveTrip.activityList ||
      !currentActivityEditId
    ) {
      return final;
    }
    let act = getActivityFunction(currentActivityEditId);
    if (act) final = act.title;
    return final;
  }
  function getCost(): number {
    let final = 0;
    if (
      !currentActiveTrip ||
      !currentActiveTrip.activityList ||
      !currentActivityEditId
    ) {
      return final;
    }
    let act = getActivityFunction(currentActivityEditId);
    if (act) final = act.cost;
    return final;
  }
  function getPayerId() {
    let final = "";
    if (
      !currentActiveTrip ||
      !currentActiveTrip.activityList ||
      !currentActivityEditId
    ) {
      return final;
    }
    let act = getActivityFunction(currentActivityEditId);
    if (act) final = act.payerId;
    return final;
  }
  interface IDropDownItem {
    id: string;
    description: string;
  }
  function getPersonItemList() {
    let final: IDropDownItem[] = [];
    if (
      !currentActiveTrip ||
      !currentActiveTrip.activityList ||
      !currentActiveTrip.personList ||
      !currentActivityEditId
    ) {
      return final;
    }
    let act = getActivityFunction(currentActivityEditId);
    if (act) {
      for (let p of currentActiveTrip.personList) {
        final.push({
          id: p.id,
          description: p.name,
        });
      }
    }
    return final;
  }
  interface IToggleListItem {
    id: string;
    description: string;
    currentState: boolean;
    isDisabled?: boolean;
  }
  function getParticipantItemList() {
    let final: IToggleListItem[] = [];
    if (
      !currentActiveTrip ||
      !currentActiveTrip.activityList ||
      !currentActiveTrip.personList ||
      !currentActivityEditId
    ) {
      return final;
    }
    let act = getActivityFunction(currentActivityEditId);
    if (act) {
      for (let p of act.participantList) {
        final.push({
          id: p.participantId,
          description: getPersonNameFunction(p.participantId),
          currentState: p.isParticipating,
        });
      }
    }
    return final;
  }

  function handlePayerSelect(id: string) {
    setPayerIdInput(id);
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

  function handleSaveActivity() {
    if (
      currentActiveTrip &&
      currentActivityEditId &&
      currentActiveTrip.owned === true
    ) {
      // error checking
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
        editActivityDataHandler(
          { action: "SAVE" },
          currentActivityEditId,
          titleInput,
          costInput,
          payerIdInput,
          tempParticipantList
        );
        editActivityUiHandler({ action: "CLOSE" });
      }
    }
  }

  function handleDeleteActivity() {
    if (
      currentActiveTrip &&
      currentActivityEditId &&
      currentActiveTrip.owned === true
    ) {
      editActivityDataHandler({ action: "DELETE" }, currentActivityEditId);
      editActivityUiHandler({ action: "CLOSE" });
    }
  }

  function handleClose() {
    editActivityUiHandler({ action: "CLOSE" });
  }

  useEffect(() => {
    setTitleInput(getTitle());
    setCostInput(getCost());
    setPayerIdInput(getPayerId());
    setPersonItemList(getPersonItemList());
    setParticipantItemList(getParticipantItemList());
  }, [currentActivityEditId]);

  if (currentActiveModal === "EDIT_ACTIVITY") {
    return (
      <Modal>
        <ModalTitle text="Edit activity" />
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
          outlineButtonAction={handleClose}
          dangerButtonText="Delete"
          dangerButtonAction={handleDeleteActivity}
          fillButtonText={"save"}
          fillButtonAction={handleSaveActivity}
        />
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default EditActivityModal;
