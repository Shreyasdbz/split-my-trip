/** @format */

import { sampleTripData } from "../../context/dummyTripData";

import TripListingBox from "./TripListingBox";
import NewTripButton from "./NewTripButton";

const TripsList = () => {
  return (
    <div className="trips-list">
      {sampleTripData.map((trip) => {
        return <TripListingBox key={trip.id} trip={trip} />;
      })}
      <NewTripButton />
    </div>
  );
};

export default TripsList;
