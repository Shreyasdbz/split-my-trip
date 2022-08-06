/** @format */

import { useContext, useEffect, useState } from "react";

import { TripDataContext } from "../../context/TripDataContext";
import { UiContext } from "../../context/UiContext";
import { SplitsCalculationLib } from "../../lib/util/split";
import Modal from "../core/Modal";
import ModalTitle from "../core/ModalTitle";
import PillButton from "../core/PillButton";
import SplitTile from "./SplitTitle";

const GetSplitModal = () => {
  const currentTrip = useContext(TripDataContext).currentTrip;
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const getSplitUiHandler = useContext(UiContext).handleGetSplit;

  const [splitsList, setSplitsList] = useState<ISplitPerson[] | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    if (currentTrip) {
      let splits: ISplitPerson[] =
        SplitsCalculationLib.buildSplitsList(currentTrip);
      setSplitsList(splits);
      setTotalCost(SplitsCalculationLib.calculateTotalTripCost(currentTrip));
    }
  }, [getSplitUiHandler, currentActiveModal]);

  if (currentActiveModal === "GET_SPLIT" && currentTrip) {
    if (!splitsList) {
      return (
        <div>
          <div>
            No splits
            {/* TODO: build this */}
          </div>
        </div>
      );
    }
    return (
      <Modal>
        <ModalTitle text={""}>
          <span>
            Split for <span className="font-semibold">{currentTrip.title}</span>
          </span>
        </ModalTitle>
        {/* Cost */}
        <div className="w-full flex flex-col items-center justify-center text-gray-600">
          <span>Total cost of the trip:</span>
          <span className="font-semibold">
            ${SplitsCalculationLib.roundAmount(totalCost)}
          </span>
        </div>

        {/* aLL Transaction ListS */}
        <div className="flex flex-col items-center justify-center gap-3 mb-4 mt-2">
          {splitsList.map((splitPerson) => {
            return (
              <SplitTile key={splitPerson.personId} splitPerson={splitPerson} />
            );
          })}
        </div>

        {/* Close Button */}
        <div className="w-full flex items-center justify-center">
          <PillButton
            text={"Close"}
            type={"OUTLINE"}
            size={"MEDIUM"}
            onClickAction={() => {
              getSplitUiHandler({ action: "CLOSE" });
            }}
          />
        </div>
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default GetSplitModal;
