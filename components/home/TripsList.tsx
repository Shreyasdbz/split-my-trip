/** @format */
import { useContext } from "react";

import { TripDataContext } from "../../context/TripDataContext";
import TripTile from "./TripTile";

interface ITripsList {
  tripsType: "owned" | "shared";
}
const TripsList = ({ tripsType }: ITripsList) => {
  const tripsList = useContext(TripDataContext).trips;

  function filterTrips(trip: ITripData) {
    if (tripsType === "owned") {
      return trip.owned == true;
    }
    if (tripsType === "shared") {
      return trip.owned == false;
    }
  }

  const filteredTrips = tripsList.filter(filterTrips);

  if (filterTrips.length != 0) {
    return (
      <div className="w-full">
        {filteredTrips.map((trip) => {
          return (
            <TripTile
              key={trip.id}
              tripId={trip.id}
              text={trip.title}
              themeId={trip.themeId}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <span>No trips here</span>
    </div>
  );
};

export default TripsList;
