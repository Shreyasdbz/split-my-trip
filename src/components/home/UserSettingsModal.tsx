/** @format */
import { useContext } from "react";

import { UserSettingsType } from "../../interfaces/homeView";
import { ThemeContext } from "../../context/ThemeContext";
import { firebase_auth } from "../../config/firebase";

type UserSettingsModalProps = {
  handler: (payload: UserSettingsType) => void;
};

const UserSettingsModal = ({ handler }: UserSettingsModalProps) => {
  const theme = useContext(ThemeContext).theme;
  return (
    <div
      className="user-settings-modal"
      style={{
        backgroundColor: `${theme.background}`,
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
      }}
    >
      <div className="title">
        <span
          style={{
            color: `${theme.text}`,
          }}
        >
          Settings
        </span>
      </div>
      {firebase_auth.currentUser && (
        <div
          className="user-info"
          style={{
            color: `${theme.text}`,
          }}
        >
          {firebase_auth.currentUser.photoURL && (
            <img
              src={firebase_auth.currentUser.photoURL}
              alt="profilePicture"
              className="picture"
              style={{
                boxShadow: `0px 2px 15px 5px ${theme.text}15`,
              }}
            />
          )}
          <div className="greeting">
            <span className="label">Hi, </span>
            <span className="name">
              {firebase_auth.currentUser.displayName}
            </span>
          </div>
        </div>
      )}
      <div className="actions">
        <button
          className="btn-toggle-theme"
          style={{
            backgroundColor: `${theme.text}`,
            color: `${theme.background}`,
            border: `1px solid ${theme.greyBackground}`,
            outline: `2px solid ${theme.greyText}`,
          }}
          onClick={() => {
            handler({ action: "CONFIRM", type: "TOGGLE THEME" });
          }}
        >
          Toggle Theme
        </button>
        <button
          className="btn-logout"
          style={{
            backgroundColor: `${theme.danger}`,
          }}
          onClick={() => {
            handler({ action: "CONFIRM", type: "LOGOUT" });
          }}
        >
          Logout
        </button>
        <button
          className="btn-cancel"
          style={{
            backgroundColor: `${theme.background}`,
            outline: `2px solid ${theme.text}`,
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

export default UserSettingsModal;
