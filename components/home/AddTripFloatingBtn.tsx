/** @format */

import { useContext } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";

import { UiContext } from "../../context/UiContext";

import ButtonCaptionText from "../core/ButtonCaptionText";
import FloatingElement from "../core/FloatingElement";

const AddTripFloatingBtn = () => {
  const newTriphandler = useContext(UiContext).handleNewTrip;
  return (
    <FloatingElement position="bottomRight">
      <button
        className="w-full h-full flex items-center justify-center flex-col text-white rounded-full"
        onClick={() => {
          newTriphandler({ payload: { action: "OPEN" } });
        }}
      >
        <ButtonCaptionText text="Add Trip" />
        <PlusCircleIcon className="h-8 w-8 rounded-full" />
      </button>
    </FloatingElement>
  );
};

export default AddTripFloatingBtn;
