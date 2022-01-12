/** @format */

import { useContext, useState } from "react";

import { AddActivityTypes } from "../../interfaces/tripView";
import { ThemeContext } from "../../context/ThemeContext";
import { getRandomActivityName } from "../../helpers/trips";

type AddActivityModalProps = {
  handler: (payload: AddActivityTypes) => void;
};

const AddActivityModal = ({ handler }: AddActivityModalProps) => {
  const theme = useContext(ThemeContext).theme;
  const [title, setTitle] = useState(getRandomActivityName());
  //   const [cost, setCost] = useState<number>(0);

  return (
    <div
      className="person-modal"
      style={{
        backgroundColor: `${theme.background}`,
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
      }}
    >
      <div className="title">
        <span>Add a person</span>
      </div>
      <div className="input-box">
        <span
          className="caption"
          style={{
            color: `${theme.greyText}`,
          }}
        >
          NAME
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
