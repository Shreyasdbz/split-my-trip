/** @format */

import { useContext, useState } from "react";

import { AddActivityTypes } from "../../interfaces/tripView";
import { ThemeContext } from "../../context/ThemeContext";
import { getRandomActivityName } from "../../helpers/trips";
import { PersonType } from "../../interfaces/tripObjects";

import DropDownSelector from "../misc/DropDownSelector";
import ParticipantToggles from "./ParticipantToggles";

type AddActivityModalProps = {
  handler: (payload: AddActivityTypes) => void;
  peopleList: PersonType[];
};

const AddActivityModal = ({ handler, peopleList }: AddActivityModalProps) => {
  const theme = useContext(ThemeContext).theme;
  const [title, setTitle] = useState(getRandomActivityName());
  const [cost, setCost] = useState<number>(Math.floor(Math.random() * 1000));
  const [payerIdSelection, setPayerIdSelection] = useState(
    peopleList[Math.floor(Math.random() * peopleList.length)].id
  );

  return (
    <div
      className="activity-modal"
      style={{
        backgroundColor: `${theme.background}`,
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
      }}
    >
      <div className="title">
        <span>Add a new Activity</span>
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
          <ParticipantToggles />
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
          }}
        >
          Cancel
        </button>
        <div
          className="divider"
          style={{
            backgroundColor: `${theme.greyBackground}`,
          }}
        />
        <button
          className="btn-confirm"
          style={{
            backgroundColor: `${theme.text}`,
            color: `${theme.background}`,
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddActivityModal;
