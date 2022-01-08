/** @format */
import { useContext } from "react";

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
    </div>
  );
};

export default HeaderHome;
