/** @format */

import { Link } from "react-router-dom";
import { IoChevronForwardCircleOutline } from "react-icons/io5";

import { TripType } from "../../interfaces/trips";
import { getTripColorById } from "../../helpers/colors";

type TripListingBoxProps = {
  trip: TripType;
};

const TripListingBox = ({ trip }: TripListingBoxProps) => {
  return (
    <Link to={`/trip${trip.id}`} className="trip-listing-box">
      <div
        className="trip-listing-box"
        style={{
          backgroundColor: `${getTripColorById(trip.colorId).backgroundColor}`,
          backgroundImage: `${getTripColorById(trip.colorId).backgroundImage}`,
          boxShadow: `0px 0px 15px 5px ${
            getTripColorById(trip.colorId).backgroundColor
          }30`,
        }}
      >
        <span>{trip.title}</span>
        <IoChevronForwardCircleOutline className="icon" />
      </div>
    </Link>
  );
};

export default TripListingBox;
