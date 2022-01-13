/** @format */

import { useContext } from "react";
import { Link } from "react-router-dom";

import { ThemeContext } from "../../context/ThemeContext";
import { TripsContext } from "../../context/TripsContext";
import { getTripColorById } from "../../helpers/colors";

const TripsList = () => {
  const theme = useContext(ThemeContext).theme;
  const trips = useContext(TripsContext).tripsList;

  if (trips.length < 1) {
    return (
      <div className="no-trips">
        <span>To get started use the</span>
        <span>'Add Trip' button in the</span>
        <span>lower right part of the screen</span>
      </div>
    );
  } else {
    return (
      <div className="trips-list-view">
        <div className="title">
          <span>My Trips</span>
        </div>
        <div className="trips-list">
          {trips.map((trip) => {
            return (
              <Link to={`/trip${trip.id}`} key={trip.id} className="trip-box">
                <button
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
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
};
export default TripsList;
