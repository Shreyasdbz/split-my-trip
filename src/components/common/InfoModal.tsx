/** @format */
import { useContext } from "react";
import { IoLogoGithub } from "react-icons/io5";

import { ThemeContext } from "../../context/ThemeContext";
import { InfoModalTypes } from "../../interfaces/commonView";

type InfoModalProps = {
  handler: (payload: InfoModalTypes) => void;
};

const InfoModal = ({ handler }: InfoModalProps) => {
  const theme = useContext(ThemeContext).theme;
  return (
    <div
      className="info-modal"
      style={{
        backgroundColor: `${theme.background}`,
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
        color: `${theme.text}`,
      }}
    >
      <div className="title">
        <span>Info</span>
      </div>

      <div className="information-box">
        <div className="heading">
          Split My Trip is an easy way to quickly figure out who owes what when
          multiple payers are involved
        </div>
        <div className="sub-heading">To get started:</div>
        <div className="instruction-list">
          <div className="instruction">
            <span
              className="number"
              style={{
                backgroundColor: `${theme.text}`,
                color: `${theme.background}`,
              }}
            >
              1
            </span>
            <span className="text">Create a trip / occasion</span>
          </div>
          <div className="instruction">
            <span
              className="number"
              style={{
                backgroundColor: `${theme.text}`,
                color: `${theme.background}`,
              }}
            >
              2
            </span>
            <span className="text">Add the people who were involved</span>
          </div>
          <div className="instruction">
            <span
              className="number"
              style={{
                backgroundColor: `${theme.text}`,
                color: `${theme.background}`,
              }}
            >
              3
            </span>
            <span className="text">
              Create activities / expenses that happened
            </span>
          </div>
          <div className="instruction">
            <span
              className="number"
              style={{
                backgroundColor: `${theme.text}`,
                color: `${theme.background}`,
              }}
            >
              4
            </span>
            <span className="text">
              Use the 'Get Split' Button to get transactions!
            </span>
          </div>
        </div>
      </div>

      <div className="actions">
        <a
          href="https://github.com/Shreyasdbz/split-my-trip"
          target="_blank"
          rel="noreferrer"
          className="git-link"
        >
          <button
            className="btn-github"
            style={{
              backgroundColor: `${theme.greyBackground}`,
              color: `2px solid ${theme.greyText}`,
            }}
          >
            <IoLogoGithub className="icon" />
            <span>GitHub</span>
          </button>
        </a>
        <button
          className="btn-cancel"
          style={{
            backgroundColor: `${theme.background}`,
            color: `${theme.text}`,
          }}
          onClick={() => {
            handler({ action: "CLOSE" });
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
