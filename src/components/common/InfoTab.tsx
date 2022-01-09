/** @format */

import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";

const InfoTab = () => {
  const theme = useContext(ThemeContext).theme;

  return (
    <a
      href="https://github.com/Shreyasdbz/split-my-trip"
      target={"_blank"}
      rel="noreferrer"
      className="link"
      style={{
        backgroundColor: `${theme.greyBackground}`,
        color: `${theme.greyText}`,
      }}
    >
      Info
    </a>
  );
};

export default InfoTab;
