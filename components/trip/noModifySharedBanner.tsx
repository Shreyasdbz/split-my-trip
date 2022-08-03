/** @format */

import { useContext } from "react";

import { TripDataContext } from "../../context/TripDataContext";

const NoModifySharedBanner = () => {
  const currentActiveTrip = useContext(TripDataContext).currentTrip;

  return (
    <div className="w-full flex items-center justify-center my-3">
      {currentActiveTrip && currentActiveTrip.owned === false ? (
        <span className="bg-gray-200 font-semibold text-gray-600 px-4 py-1 rounded-lg text-sm md:text-md">
          can't modify shared trips
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NoModifySharedBanner;
