/** @format */

import { useContext } from "react";

import { UiContext } from "../../context/UiContext";

import PillButton from "../core/PillButton";

const EditTripBtn = () => {
  const editTripUiHandler = useContext(UiContext).handleEditTrip;

  return (
    <div className="w-full flex items-center justify-center py-6">
      <PillButton
        text={"Edit Trip"}
        type={"OUTLINE"}
        size={"LARGE"}
        onClickAction={() => {
          editTripUiHandler({ action: "OPEN" });
        }}
      />
    </div>
  );
};

export default EditTripBtn;
