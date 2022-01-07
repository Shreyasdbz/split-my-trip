/** @format */

import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";
import { getWindowDimensions } from "../../helpers/dimensions";

const Header = () => {
  const theme = useContext(ThemeContext).theme;
  const windowDimensions = getWindowDimensions();

  return (
    <div
      className={`header ${
        windowDimensions.width > 600 ? "header-large" : "header-small"
      }`}
      style={{
        backgroundColor: `${theme.primary}`,
      }}
    >
      <span>Split My Trip</span>
    </div>
  );
};

export default Header;
