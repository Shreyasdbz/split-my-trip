/** @format */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";

import { ThemeContext } from "../../context/ThemeContext";
import { getTripColorById } from "../../helpers/colors";

type HeaderProps = {
  title: string;
  colorId: number;
};

const Header = ({ title, colorId }: HeaderProps) => {
  const theme = useContext(ThemeContext).theme;
  return (
    <div
      className="header"
      style={{
        boxShadow: `0px 2px 15px 5px ${theme.text}15`,
        backgroundColor: `${theme.background}`,
      }}
    >
      <Link to={"/"}>
        <button className="icon-btn">
          <IoChevronBackCircle
            className="icon"
            style={{
              color: `${getTripColorById(colorId).backgroundColor}`,
            }}
          />
        </button>
      </Link>
      <div
        className="title"
        style={{
          color: `${theme.text}`,
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default Header;
