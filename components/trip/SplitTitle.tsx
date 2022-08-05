/** @format */

import { useContext } from "react";
import { TripDataContext } from "../../context/TripDataContext";
import { getColorById } from "../../lib/util/theme";

interface ISplitTile {
  personName: string;
  endingAmount: number;
  transactionList: ISplitTransaction[];
}
const SplitTile = () => {
  const currentTrip = useContext(TripDataContext).currentTrip;

  if (currentTrip) {
    return (
      <div
        style={{
          boxShadow: `0px 2px 15px 5px ${
            getColorById(currentTrip.themeId).bgColor
          }15`,
        }}
        className="rounded-md w-full overflow-hidden"
      >
        {/* Top Row */}
        <div
          style={{
            backgroundColor: `${getColorById(currentTrip.themeId).bgColor}`,
            backgroundImage: `${getColorById(currentTrip.themeId).bgImage}`,
          }}
          className="flex flex-row items-center justify-between px-2 py-2"
        >
          <span className="text-white font-semibold">Person 1</span>
          <span className="bg-white px-2 py-1 text-green-600 rounded-xl">
            + $50
          </span>
        </div>

        {/* Transaction list */}
        <div className="flex flex-col bg-white w-full items-start justify-center px-2 py-2">
          <div>
            <span>
              Receive <span className="font-semibold">$58</span> from{" "}
              <span
                style={{
                  color: `${getColorById(currentTrip.themeId).bgColor}`,
                }}
                className="font-semibold"
              >
                Person 2
              </span>
            </span>
          </div>
          <div>
            <span>
              Receive <span className="font-semibold">$58</span> from{" "}
              <span
                style={{
                  color: `${getColorById(currentTrip.themeId).bgColor}`,
                }}
                className="font-semibold"
              >
                Person 2
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {/* TODO: */}
        <div>no trip no split</div>
      </div>
    );
  }
};

export default SplitTile;
