/** @format */

import { useContext, useState, useRef, useEffect } from "react";

import { AddPersonTypes } from "../../interfaces/tripView";
import { ThemeContext } from "../../context/ThemeContext";
// import { getRandomPersonName } from "../../helpers/trips";

type AddPersonModalProps = {
  handler: (payload: AddPersonTypes) => void;
};

const AddPersonModal = ({ handler }: AddPersonModalProps) => {
  const theme = useContext(ThemeContext).theme;
  // const [name, setName] = useState(getRandomPersonName());
  const [name, setName] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="person-modal"
      style={{
        backgroundColor: `${theme.background}`,
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
      }}
    >
      <div className="title">
        <span style={{ color: `${theme.text}` }}>Add a new person</span>
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
          ref={inputRef}
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
            color: `${theme.text}`,
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
