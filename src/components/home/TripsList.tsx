/** @format */

import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { ThemeContext } from "../../context/ThemeContext";
import { getTripColorById } from "../../helpers/colors";
import { getTrips } from "../../helpers/user";

const TripsList = () => {
  const theme = useContext(ThemeContext).theme;

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <div className="trips-list-view">
      <div className="title">
        <span>My Trips</span>
      </div>
      <div className="trips-list">
        {/* {testTrips.map((trip) => {
          return (
            <Link
              to={`/trip${trip.name}`}
              key={trip.name}
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
              <span>{trip.name}</span>
            </Link>
          );
        })} */}
        <ul>
          <li>hi1</li>
        </ul>
      </div>
    </div>
  );
};
export default TripsList;
