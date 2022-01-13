/** @format */

import { useContext } from "react";

import { InfoModalTypes } from "../../interfaces/commonView";
import { ThemeContext } from "../../context/ThemeContext";

type InfoTabProps = {
  handler: (payload: InfoModalTypes) => void;
};

const InfoTab = ({ handler }: InfoTabProps) => {
  const theme = useContext(ThemeContext).theme;

  return (
    <button
      className="info-link"
      style={{
        backgroundColor: `${theme.greyBackground}`,
        color: `${theme.greyText}`,
      }}
      onClick={() => {
        handler({ action: "OPEN" });
      }}
    >
      Info
    </button>
  );
};

export default InfoTab;
