/** @format */

import { useContext } from "react";
import { ChartPieIcon } from "@heroicons/react/solid";

import { UiContext } from "../../context/UiContext";

import ButtonCaptionText from "../core/ButtonCaptionText";
import FloatingElement from "../core/FloatingElement";

const GetSplitFloatingBtn = () => {
  const newTriphandler = useContext(UiContext).handleNewTrip;
  return (
    <FloatingElement position="bottomRight">
      <button
        className="w-full h-full flex items-center justify-center flex-col text-white rounded-full"
        onClick={() => {
          //   newTriphandler({ action: "OPEN" });
        }}
      >
        <ButtonCaptionText text="Get Split" />
        <ChartPieIcon className="h-8 w-8 rounded-full" />
      </button>
    </FloatingElement>
  );
};

export default GetSplitFloatingBtn;
