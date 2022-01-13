/** @format */
import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";
import { EditTripTypes } from "../../interfaces/tripView";

type EditTripButtonProps = {
  handler: (payload: EditTripTypes) => void;
};

const EditTripButton = ({ handler }: EditTripButtonProps) => {
  const theme = useContext(ThemeContext).theme;
  return (
    <button
      className="edit-trip-btn"
      style={{
        backgroundColor: `${theme.background}`,
        border: `2px solid ${theme.text}`,
        color: `${theme.text}`,
      }}
      onClick={() => {
        handler({ action: "OPEN" });
      }}
    >
      Edit Trip
    </button>
  );
};

export default EditTripButton;
