/** @format */

import { useContext } from "react";
import { useRouter } from "next/router";

import { ArrowCircleLeftIcon } from "@heroicons/react/solid";

import { TripDataContext } from "../../context/TripDataContext";
import { getColorById } from "../../lib/util/theme";

import HeaderTitle from "../core/HeaderTitle";

interface IHeader {
  text: string;
  themeId: string;
}
const Header = ({ text, themeId }: IHeader) => {
  const nextRouter = useRouter();
  const resetAll = useContext(TripDataContext).resetAllCurrent;

  return (
    <div className="w-screen h-36 bg-white shadow-lg rounded-br-3xl rounded-bl-3xl flex items-center justify-between px-4 sticky text-right pt-4">
      <button
        className="hoverTransformScaleHigh"
        onClick={() => {
          resetAll();
          nextRouter.back();
        }}
      >
        <ArrowCircleLeftIcon
          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-white border-none outline-none"
          style={{
            color: `${getColorById(themeId).bgColor}`,
            //   backgroundImage: `${getColorById(themeId).bgImage}`,
            // boxShadow: `0px 2px 15px 5px ${getColorById(themeId).bgColor}25`,
          }}
        />
      </button>
      <HeaderTitle text={text} />
    </div>
  );
};

export default Header;
