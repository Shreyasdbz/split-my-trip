/** @format */

import { useContext } from "react";
import { IoAddCircle } from "react-icons/io5";

import { ThemeContext } from "../../context/ThemeContext";

const AddTripButton = () => {
  const theme = useContext(ThemeContext).theme;

  return (
    <button
      className="add-trip-btn"
      style={{
        backgroundColor: `${theme.background}`,
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
      }}
    >
      <span
        style={{
          color: `${theme.greyText}`,
        }}
      >
        Add Trip
      </span>
      <div className="icon-wrapper">
        <IoAddCircle
          className="icon"
          style={{
            color: `${theme.text}`,
          }}
        />
      </div>
    </button>
  );
};

export default AddTripButton;
