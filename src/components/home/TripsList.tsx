/** @format */

import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { ThemeContext } from "../../context/ThemeContext";
import { TripsContext } from "../../context/TripsContext";
import { getTripColorById } from "../../helpers/colors";

const TripsList = () => {
  const theme = useContext(ThemeContext).theme;
  const trips = useContext(TripsContext).tripsList;
  const refreshTripsFunction = useContext(TripsContext).refreshTrips;

  useEffect(() => {
    refreshTripsFunction();
  }, [refreshTripsFunction]);

  return (
    <div className="trips-list-view">
      <div className="title">
        <span>My Trips</span>
      </div>
      <div className="trips-list">
        {trips.map((trip) => {
          return (
            <Link
              to={`/trip${trip.id}`}
              key={trip.id}
              className="trip-box"
              style={{
                boxShadow: `0px 2px 15px 5px ${theme.text}25`,
                backgroundColor: `${
                  getTripColorById(trip.colorId).backgroundColor
                }`,
                backgroundImage: `${
                  getTripColorById(trip.colorId).backgroundImage
                }`,
              }}
            >
              <span>{trip.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default TripsList;
