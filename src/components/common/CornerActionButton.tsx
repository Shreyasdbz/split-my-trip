/** @format */

import { useContext } from "react";
import { IconType } from "react-icons/lib";

import { ThemeContext } from "../../context/ThemeContext";

type CornerActionButtonProps = {
  text: string;
  Icon: IconType;
  clickAction: () => void;
};

const CornerActionButton = ({
  text,
  Icon,
  clickAction,
}: CornerActionButtonProps) => {
  const theme = useContext(ThemeContext).theme;

  return (
    <button
      className="corner-action-btn"
      style={{
        backgroundColor: `${theme.background}`,
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
      }}
      onClick={clickAction}
    >
      <span
        style={{
          color: `${theme.greyText}`,
        }}
      >
        {text}
      </span>
      <div className="icon-wrapper">
        <Icon
          className="icon"
          style={{
            color: `${theme.text}`,
          }}
        />
      </div>
    </button>
  );
};

export default CornerActionButton;
