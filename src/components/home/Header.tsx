/** @format */

import { useContext } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

import { UserSettingsType } from "../../interfaces/homeView";
import { ThemeContext } from "../../context/ThemeContext";
// import { firebase_auth } from "../../config/firebase";

type HeaderProps = {
  handler: (payload: UserSettingsType) => void;
};

const Header = ({ handler }: HeaderProps) => {
  const theme = useContext(ThemeContext).theme;

  return (
    <div
      className="header"
      style={{
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
        backgroundColor: `${theme.background}`,
      }}
    >
      <span
        className="title"
        style={{
          color: `${theme.text}`,
        }}
      >
        Split My Trip
      </span>
      <button
        className="icon-btn"
        onClick={() => {
          handler({ action: "OPEN" });
        }}
      >
        <IoPersonCircleOutline
          className="icon"
          style={{ color: `${theme.text}` }}
        />
      </button>
      {/* <button
        className="icon-btn"
        onClick={() => {
          handler({ action: "OPEN" });
        }}
      >
        {firebase_auth.currentUser ? (
          firebase_auth.currentUser.photoURL ? (
            <img
              src={firebase_auth.currentUser.photoURL}
              alt="profilePhoto"
              className="profile-photo"
              style={{
                boxShadow: `0px 2px 15px 5px ${theme.text}15`,
              }}
            />
          ) : (
            <IoPersonCircleOutline className="icon" />
          )
        ) : (
          <IoPersonCircleOutline className="icon" />
        )}
      </button> */}
    </div>
  );
};

export default Header;
