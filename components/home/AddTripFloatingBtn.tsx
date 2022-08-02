/** @format */

import { PlusCircleIcon } from "@heroicons/react/solid";

import FloatingElement from "../core/FloatingElement";

const AddTripFloatingBtn = () => {
  return (
    <FloatingElement position="bottomRight">
      <button>
        <PlusCircleIcon />
        <span>Add Trip</span>
      </button>
    </FloatingElement>
  );
};

export default AddTripFloatingBtn;
