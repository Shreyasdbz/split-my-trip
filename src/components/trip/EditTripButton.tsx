/** @format */
import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

const EditTripButton = () => {
  const theme = useContext(ThemeContext).theme;
  return (
    <button
      className="edit-trip-btn"
      style={{
        backgroundColor: `${theme.background}`,
        border: `2px solid ${theme.text}`,
      }}
    >
      Edit Trip
    </button>
  );
};

export default EditTripButton;
