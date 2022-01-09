/** @format */

import { useContext } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

import { firebase_auth } from "../../config/firebase";
import { ThemeContext } from "../../context/ThemeContext";

const Header = () => {
  const theme = useContext(ThemeContext).theme;

  return (
    <div
      className="header"
      style={{
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
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
          firebase_auth.signOut();
        }}
      >
        <IoPersonCircleOutline className="icon" />
      </button>
    </div>
  );
};

export default Header;
