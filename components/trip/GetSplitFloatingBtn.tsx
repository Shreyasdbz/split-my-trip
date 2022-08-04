/** @format */

import { useContext } from "react";
import { ChartPieIcon } from "@heroicons/react/solid";

import { UiContext } from "../../context/UiContext";

import ButtonCaptionText from "../core/ButtonCaptionText";
import FloatingElement from "../core/FloatingElement";

const GetSplitFloatingBtn = () => {
  const getSplitHandler = useContext(UiContext).handleGetSplit;
  return (
    <FloatingElement position="bottomRight">
      <button
        className="w-full h-full flex items-center justify-center flex-col text-white rounded-full"
        onClick={() => {
          getSplitHandler({ action: "OPEN" });
        }}
      >
        <ButtonCaptionText text="Get Split" />
        <ChartPieIcon className="h-6 w-6 md:h-8 md:w-8 rounded-full mb-1" />
      </button>
    </FloatingElement>
  );
};

export default GetSplitFloatingBtn;
