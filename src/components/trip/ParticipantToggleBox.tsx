/** @format */

import { useState, useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";
import { getTripColorById } from "../../helpers/colors";

type ParticipantToggleBoxProps = {
  participantId: string;
  participantName: string;
  participating: boolean;
  tripColorId: number;
  handleToggle: (personId: string) => void;
};

const ParticipantToggleBox = ({
  participantId,
  participantName,
  participating,
  tripColorId,
  handleToggle,
}: ParticipantToggleBoxProps) => {
  const theme = useContext(ThemeContext).theme;
  const [participatingState, setParticipatingState] = useState(participating);

  function handleChange() {
    setParticipatingState(!participatingState);
    handleToggle(participantId);
  }

  return (
    <div
      className="participant-toggle-box"
      style={{
        border: `2px solid ${theme.greyBackground}`,
      }}
    >
      <span>{participantName}</span>
      {participatingState ? (
        <button
          className={`toggle-box participating`}
          style={{
            backgroundColor: `${getTripColorById(tripColorId).backgroundColor}`,
            backgroundImage: `${getTripColorById(tripColorId).backgroundImage}`,
            border: `2px solid ${theme.greyBackground}`,
          }}
          onClick={handleChange}
        >
          <div
            className="toggle"
            style={{
              backgroundColor: `${theme.background}`,
              outline: `1px solid ${theme.greyText}50`,
              border: `1px solid ${theme.background}`,
            }}
          />
        </button>
      ) : (
        <button
          className={`toggle-box `}
          style={{
            backgroundColor: `${theme.background}`,
            border: `2px solid ${theme.greyBackground}`,
          }}
          onClick={handleChange}
        >
          <div
            className="toggle"
            style={{
              backgroundColor: `${theme.background}`,
              outline: `1px solid ${theme.greyText}50`,
              border: `1px solid ${theme.background}`,
            }}
          />
        </button>
      )}
    </div>
  );
};

export default ParticipantToggleBox;
