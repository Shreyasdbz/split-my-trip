/** @format */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoChevronForwardCircleOutline } from "react-icons/io5";

import { TripType } from "../../interfaces/trips";
import { ThemeContext } from "../../context/ThemeContext";
import { getTripColorById } from "../../helpers/colors";

const NewTripButton = () => {
  const theme = useContext(ThemeContext).theme;
  return (
    <div
      className="trip-listing-box"
      style={{
        backgroundColor: `${theme.secondary}`,
        boxShadow: `0px 0px 15px 5px ${theme.secondary}30`,
      }}
    >
      <span>Add New Trip</span>
      <IoChevronForwardCircleOutline className="icon" />
    </div>
  );
};

export default NewTripButton;
