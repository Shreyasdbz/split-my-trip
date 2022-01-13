/** @format */

import { useContext, useState } from "react";

import { AddPersonTypes } from "../../interfaces/tripView";
import { ThemeContext } from "../../context/ThemeContext";
import { getRandomPersonName } from "../../helpers/trips";

type AddPersonModalProps = {
  handler: (payload: AddPersonTypes) => void;
};

const AddPersonModal = ({ handler }: AddPersonModalProps) => {
  const theme = useContext(ThemeContext).theme;
  const [name, setName] = useState(getRandomPersonName());

  return (
    <div
      className="person-modal"
      style={{
        backgroundColor: `${theme.background}`,
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
      }}
    >
      <div className="title">
        <span>Add a new person</span>
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
            outline: `2px solid ${theme.text}`,
          }}
          onClick={() => {
            handler({
              action: "CONFIRM",
              name: name,
            });
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddPersonModal;
