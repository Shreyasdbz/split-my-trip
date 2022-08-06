/** @format */
import { useContext, useEffect, useState } from "react";

import { TripDataContext } from "../../context/TripDataContext";

import TripTile from "./TripTile";

interface ITripsList {
  tripsType: "owned" | "shared";
}
const TripsList = ({ tripsType }: ITripsList) => {
  const currentUser = useContext(TripDataContext).currentUser;
  const tripsList = useContext(TripDataContext).trips;
  const [filteredTrips, setFilteredTrips] = useState<ITripData[]>(
    getFilteredTrips()
  );

  function getFilteredTrips(): ITripData[] {
    let tempTrips: ITripData[] = [];
    if (tripsList) {
      tempTrips = tripsList.filter(filterTripsFunction);
    }
    return tempTrips;
  }

  function filterTripsFunction(trip: ITripData) {
    if (tripsType === "owned") {
      return trip.owned == true;
    }
    if (tripsType === "shared") {
      return trip.owned == false;
    }
  }

  useEffect(() => {
    let newList = getFilteredTrips();
    setFilteredTrips(newList);
  }, [currentUser, tripsList]);

  if (filteredTrips.length != 0) {
    return (
      <div className="w-full flex flex-col gap-4">
        {filteredTrips.map((trip) => {
          // TODO: Add auto-animate
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
