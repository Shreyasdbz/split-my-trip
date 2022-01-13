/** @format */

import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { tripColors } from "../../styles/tripColors";
import { EditTripTypes } from "../../interfaces/tripView";
import { ThemeContext } from "../../context/ThemeContext";
import { TripsContext } from "../../context/TripsContext";

type EditTripModalProps = {
  handler: (payload: EditTripTypes) => void;
};

const EditTripModal = ({ handler }: EditTripModalProps) => {
  const theme = useContext(ThemeContext).theme;
  let tripId = useParams().tripID;
  const getTripByIdFunction = useContext(TripsContext).getTripById;
  const trip = getTripByIdFunction(tripId);

  const [title, setTitle] = useState<string>(trip.title);
  const [colorId, setColorId] = useState<number>(trip.colorId);

  let selectedSwatchOutline = `5px solid ${theme.greyText}50`;

  return (
    <div
      className="trip-modal"
      style={{
        backgroundColor: `${theme.background}`,
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
      }}
    >
      <div className="title">
        <span>Edit Trip</span>
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
                  outline: `${
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
      <div className="actions triple-actions">
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

        <button
          className="btn-delete"
          style={{
            backgroundColor: `${theme.background}`,
          }}
          onClick={() => {
            handler({
              action: "CONFIRM",
              title: title,
              colorId: colorId,
              toDelete: true,
            });
          }}
        >
          <Link
            to={`/`}
            className="link"
            style={{
              color: `${theme.danger}`,
            }}
          >
            Delete
          </Link>
        </button>
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
              title: title,
              colorId: colorId,
              toDelete: false,
            });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTripModal;
