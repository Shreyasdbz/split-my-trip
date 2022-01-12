/** @format */

import { useContext } from "react";
import { useParams } from "react-router-dom";

import { ThemeContext } from "../../context/ThemeContext";
import { TripsContext } from "../../context/TripsContext";
import { getTripColorById } from "../../helpers/colors";
import { AddActivityTypes } from "../../interfaces/tripView";
import { getPersonNameById } from "../../helpers/trips";

type PeopleSectionProps = {
  addHandler: (payload: AddActivityTypes) => void;
};

const ActivitiesSection = ({ addHandler }: PeopleSectionProps) => {
  const theme = useContext(ThemeContext).theme;
  let tripId = useParams().tripID;
  const getTripByIdFunction = useContext(TripsContext).getTripById;
  const trip = getTripByIdFunction(tripId);

  return (
    <div className="trip-view-section activities-section">
      <div className="section-header">
        <span>Activities</span>
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
      <div className="activities-list">
        {trip.activityList.map((activity) => {
          return (
            <button
              key={activity.id}
              className="activity"
              style={{
                backgroundColor: `${
                  getTripColorById(trip.colorId).backgroundColor
                }`,
                backgroundImage: `${
                  getTripColorById(trip.colorId).backgroundImage
                }`,
                boxShadow: `0px 2px 15px 5px ${theme.text}25`,
              }}
            >
              <div className="top-section">
                <div className="title">
                  <span>{activity.title}</span>
                </div>
                <div className="cost">
                  <span>$ {activity.cost}</span>
                </div>
              </div>
              <div
                className="divider"
                style={{
                  backgroundColor: `${theme.greyBackground}`,
                }}
              />
              <div className="bottom-section">
                <div className="paid-by">
                  <span className="label">Paid by: </span>
                  <span className="payer">
                    {getPersonNameById(activity.payerId, trip.peopleList)}
                  </span>
                </div>
                <div className="participant-list">
                  {activity.participantList.map((participant) => {
                    if (participant.participating) {
                      return (
                        <div
                          key={participant.participantId}
                          className="participant"
                        >
                          {getPersonNameById(
                            participant.participantId,
                            trip.peopleList
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <span
                          key={participant.participantId}
                          className="no-participant"
                        ></span>
                      );
                    }
                  })}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ActivitiesSection;