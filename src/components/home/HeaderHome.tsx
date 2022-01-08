/** @format */
import { useContext } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

import { ThemeContext } from "../../context/ThemeContext";

const HeaderHome = () => {
  const theme = useContext(ThemeContext).theme;
  return (
    <div
      className="header-home"
      style={{
        backgroundColor: `${theme.primary}`,
        boxShadow: `0px 0px 15px 5px ${theme.primary}30`,
      }}
    >
      <span>Split My Trip</span>
      <button className="btn">
        <IoPersonCircleOutline className="icon" />
      </button>
    </div>
  );
};

export default HeaderHome;
