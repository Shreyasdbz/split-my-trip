/** @format */

import { useContext } from "react";

import { SplitType } from "../../interfaces/splitObjects";
import { SplitModalTypes } from "../../interfaces/tripView";
import { ThemeContext } from "../../context/ThemeContext";

type SplitsModalProps = {
  splitsList: SplitType[];
  handler: (payload: SplitModalTypes) => void;
};

const SplitsModal = ({ splitsList, handler }: SplitsModalProps) => {
  const theme = useContext(ThemeContext).theme;

  console.log(splitsList);

  return (
    <div
      className="splits-modal"
      style={{
        backgroundColor: `${theme.background}`,
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
      }}
    >
      <div className="title">
        <span>Splits</span>
      </div>
      <div className="actions">
        <button
          onClick={() => {
            handler({ action: "CLOSE" });
          }}
          className="btn-cancel"
          style={{
            backgroundColor: `${theme.background}`,
            border: `2px solid ${theme.text}`,
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SplitsModal;
