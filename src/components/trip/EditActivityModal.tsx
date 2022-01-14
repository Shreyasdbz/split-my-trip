/** @format */

import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { ActivityType } from "../../interfaces/tripObjects";
import { EditActivityTypes } from "../../interfaces/tripView";
import { TripsContext } from "../../context/TripsContext";
import { ThemeContext } from "../../context/ThemeContext";
import {
  buildParticipantListMinimized,
  buildParticipantListMerged,
} from "../../helpers/trips";

import DropDownSelector from "../misc/DropDownSelector";
import ParticipantToggles from "./ParticipantToggles";

type EditActivityModalProps = {
  activity: ActivityType;
  handler: (payload: EditActivityTypes) => void;
};

const EditActivityModal = ({ activity, handler }: EditActivityModalProps) => {
  const getTripByIdFunction = useContext(TripsContext).getTripById;
  let tripId = useParams().tripID;
  const trip = getTripByIdFunction(tripId);
  const peopleList = trip.peopleList;

  const theme = useContext(ThemeContext).theme;
  const [title, setTitle] = useState(activity.title);
  const [cost, setCost] = useState<number>(activity.cost);
  const [payerIdSelection, setPayerIdSelection] = useState(activity.payerId);
  const [participantList, setParticipantList] = useState(
    buildParticipantListMerged(peopleList, activity.participantList)
  );

  function handleToggle(personId: string) {
    let tempParticipantList = participantList;
    for (let p of tempParticipantList) {
      if (p.participantId === personId) {
        p.participating = !p.participating;
      }
    }
    setParticipantList(tempParticipantList);
  }

  function handleDelete() {
    let newActivity: ActivityType = {
      id: activity.id,
      title: title,
      cost: cost,
      payerId: payerIdSelection,
      participantList: buildParticipantListMinimized(participantList),
    };
    handler({ action: "CONFIRM", activity: newActivity, toDelete: true });
  }

  function handleSave() {
    let newActivity: ActivityType = {
      id: activity.id,
      title: title,
      cost: cost,
      payerId: payerIdSelection,
      participantList: buildParticipantListMinimized(participantList),
    };
    handler({ action: "CONFIRM", activity: newActivity, toDelete: false });
  }

  return (
    <div
      className="activity-modal"
      style={{
        backgroundColor: `${theme.background}`,
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
      }}
    >
      <div className="title">
        <span style={{ color: `${theme.text}` }}>Edit an Activity</span>
      </div>
      <div className="input-form">
        <div className="input-box">
          <span
            className="caption"
            style={{
              color: `${theme.greyText}`,
            }}
          >
            TITLE
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            style={{
              backgroundColor: `${theme.greyBackground}`,
              border: `2px solid ${theme.text}5`,
            }}
          />
        </div>
        <div className="input-box">
          <span
            className="caption"
            style={{
              color: `${theme.greyText}`,
            }}
          >
            COST
          </span>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(parseFloat(e.target.value))}
            className="input"
            style={{
              backgroundColor: `${theme.greyBackground}`,
              border: `2px solid ${theme.text}5`,
            }}
          />
        </div>
        <div className="input-box">
          <span
            className="caption"
            style={{
              color: `${theme.greyText}`,
            }}
          >
            PAYER
          </span>
          <DropDownSelector
            selectedValue={payerIdSelection}
            onSelect={setPayerIdSelection}
            selectionList={peopleList}
          />
        </div>
        <div className="input-box">
          <span
            className="caption"
            style={{
              color: `${theme.greyText}`,
            }}
          >
            PARTICIPANTS
          </span>
          <ParticipantToggles
            participantList={participantList}
            peopleList={peopleList}
            tripColorId={trip.colorId}
            handleToggle={handleToggle}
          />
        </div>
      </div>
      <div className="actions">
        <button
          onClick={() => {
            handler({ action: "CLOSE" });
          }}
          className="btn-cancel"
          style={{
            backgroundColor: `${theme.background}`,
            border: `2px solid ${theme.text}`,
            color: `${theme.text}`,
          }}
        >
          Cancel
        </button>
        <button
          className="btn-delete"
          style={{
            color: `${theme.danger}`,
            backgroundColor: `${theme.background}`,
          }}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="btn-confirm"
          style={{
            backgroundColor: `${theme.text}`,
            color: `${theme.background}`,
          }}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditActivityModal;
