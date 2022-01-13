/** @format */

import { useContext } from "react";
import { useParams } from "react-router-dom";

import { AddActivityTypes, EditActivityTypes } from "../../interfaces/tripView";
import { ActivityType } from "../../interfaces/tripObjects";
import { ThemeContext } from "../../context/ThemeContext";
import { TripsContext } from "../../context/TripsContext";
import { getTripColorById } from "../../helpers/colors";
import { getPersonNameById } from "../../helpers/trips";

type PeopleSectionProps = {
  addHandler: (payload: AddActivityTypes) => void;
  editHandler: (payload: EditActivityTypes) => void;
};

const ActivitiesSection = ({ addHandler, editHandler }: PeopleSectionProps) => {
  const theme = useContext(ThemeContext).theme;
  let tripId = useParams().tripID;
  const getTripByIdFunction = useContext(TripsContext).getTripById;
  const trip = getTripByIdFunction(tripId);

  return (
    <div className="trip-view-section activities-section">
      <div className="section-header">
        <span
          style={{
            color: `${theme.text}`,
          }}
        >
          Activities
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
                boxShadow: `0px 2px 15px 5px ${theme.text}15`,
              }}
              onClick={() => {
                let editActivity: ActivityType = {
                  id: activity.id,
                  title: activity.title,
                  cost: activity.cost,
                  payerId: activity.payerId,
                  participantList: activity.participantList,
                };
                editHandler({ action: "OPEN", activity: editActivity });
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
                    return (
                      <div key={participant} className="participant">
                        {getPersonNameById(participant, trip.peopleList)}
                      </div>
                    );
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
