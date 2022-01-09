/** @format */

import { useContext } from "react";
import { Link } from "react-router-dom";

import { ThemeContext } from "../../context/ThemeContext";
import { getTripColorById } from "../../helpers/colors";

type TripType = {
  name: string;
  colorId: number;
};

export const testTrips: TripType[] = [
  {
    name: "Havana",
    colorId: 1,
  },
  {
    name: "Camping",
    colorId: 2,
  },
  {
    name: "Eagles Game",
    colorId: 3,
  },
  {
    name: "Cookout",
    colorId: 4,
  },
  {
    name: "Europe",
    colorId: 5,
  },
  {
    name: "Dan's Birthday or something like that eyyyy and some really long text",
    colorId: 6,
  },
  {
    name: "Colorado",
    colorId: 7,
  },
  {
    name: "Southern Road Trip",
    colorId: 8,
  },
];

const TripsList = () => {
  const theme = useContext(ThemeContext).theme;

  return (
    <div className="trips-list-view">
      <div className="title">
        <span>My Trips</span>
      </div>
      <div className="trips-list">
        {testTrips.map((trip) => {
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
        })}
      </div>
    </div>
  );
};
export default TripsList;
