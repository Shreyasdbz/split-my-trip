/** @format */

import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

const HeaderSignOn = () => {
  const theme = useContext(ThemeContext).theme;

  return (
    <div
      className="header-signOn"
      style={{
        backgroundColor: `${theme.primary}`,
        boxShadow: `0px 0px 15px 5px ${theme.primary}30`,
      }}
    >
      <span>Split</span>
      <span>My</span>
      <span>Trip</span>
    </div>
  );
};

export default HeaderSignOn;
