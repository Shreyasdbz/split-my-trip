/** @format */
import { useState, useContext } from "react";

import { tripColors } from "../../styles/tripColors";
import { NewTripTypes } from "../../interfaces/homeView";
import { ThemeContext } from "../../context/ThemeContext";
import { getRandomTripName } from "../../helpers/trips";

type NewTripModalProps = {
  handler: (payload: NewTripTypes) => void;
};

const NewTripModal = ({ handler }: NewTripModalProps) => {
  const theme = useContext(ThemeContext).theme;
  const [title, setTitle] = useState<string>(getRandomTripName());
  const [colorId, setColorId] = useState<number>(1);

  let selectedSwatchOutline = `5px solid ${theme.greyBackground}50`;

  return (
    <div
      className="trip-modal"
      style={{
        backgroundColor: `${theme.background}`,
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
      }}
    >
      <div className="title">
        <span
          style={{
            color: `${theme.text}`,
          }}
        >
          Add a new trip
        </span>
      </div>
      <div className="input-box">
        <span
          className="caption"
          style={{
            color: `${theme.greyText}`,
          }}
        >
          TRIP NAME
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
      <div className="input-box color-picker-box">
        <span
          className="caption"
          style={{
            color: `${theme.greyText}`,
          }}
        >
          THEME
        </span>
        <div className="color-swatch-list">
          {tripColors.map((col) => {
            return (
              <button
                key={col.id}
                className="swatch"
                style={{
                  backgroundColor: `${col.backgroundColor}`,
                  backgroundImage: `${col.backgroundImage}`,
                  marginLeft: `${col === tripColors[0] ? "2rem" : "0rem"}`,
                  marginRight: `${
                    col === tripColors[tripColors.length - 1] ? "2rem" : "0rem"
                  }`,
                  border: `${
                    col.id === colorId ? selectedSwatchOutline : "none"
                  }`,
                }}
                onClick={() => {
                  setColorId(col.id);
                }}
              />
            );
          })}
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
              title: title,
              colorId: colorId,
            });
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default NewTripModal;
