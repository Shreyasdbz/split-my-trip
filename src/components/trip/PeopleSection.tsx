/** @format */

import { useContext } from "react";
import { useParams } from "react-router-dom";

import { ThemeContext } from "../../context/ThemeContext";
import { TripsContext } from "../../context/TripsContext";
import { getTripColorById } from "../../helpers/colors";
import { AddPersonTypes, EditPersonTypes } from "../../interfaces/tripView";

type PeopleSectionProps = {
  addHandler: (payload: AddPersonTypes) => void;
  editHandler: (payload: EditPersonTypes) => void;
};

const PeopleSection = ({ addHandler, editHandler }: PeopleSectionProps) => {
  const theme = useContext(ThemeContext).theme;
  let tripId = useParams().tripID;
  const getTripByIdFunction = useContext(TripsContext).getTripById;
  const trip = getTripByIdFunction(tripId);

  return (
    <div className="trip-view-section people-section">
      <div className="section-header">
        <span
          style={{
            color: `${theme.text}`,
          }}
        >
          People
        </span>
        <button
          className="add-btn"
          style={{
            backgroundColor: `${theme.greyBackground}`,
            color: `${theme.greyText}`,
          }}
          onClick={() => {
            addHandler({ action: "OPEN" });
          }}
        >
          +ADD
        </button>
      </div>
      <div className="people-list">
        {trip.peopleList.map((person) => {
          return (
            <button
              key={person.id}
              className="person"
              style={{
                backgroundColor: `${
                  getTripColorById(trip.colorId).backgroundColor
                }`,
                backgroundImage: `${
                  getTripColorById(trip.colorId).backgroundImage
                }`,
                boxShadow: `0px 2px 15px 5px ${theme.text}15`,
                marginRight: `${
                  person.id === trip.peopleList[trip.peopleList.length - 1].id
                    ? "2rem"
                    : "0rem"
                }`,
              }}
              onClick={() => {
                editHandler({ action: "OPEN", person: person });
              }}
            >
              <span>{person.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PeopleSection;
