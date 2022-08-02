/** @format */

import { PlusCircleIcon } from "@heroicons/react/solid";
import CaptionText from "../core/CaptionText";

import FloatingElement from "../core/FloatingElement";

const AddTripFloatingBtn = () => {
  return (
    <FloatingElement position="bottomRight">
      <button className="w-full h-full flex items-center justify-center flex-col">
        <CaptionText text="Add Trip" />
        <PlusCircleIcon className="h-8 w-8" />
      </button>
    </FloatingElement>
  );
};

export default AddTripFloatingBtn;
