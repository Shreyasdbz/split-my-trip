/** @format */

import { useContext, useEffect } from "react";

import { UiContext } from "../../context/UiContext";
import { TripDataContext } from "../../context/TripDataContext";

import { getColorById } from "../../lib/util/theme";

const ActivityListView = () => {
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const currentActiveTrip = useContext(TripDataContext).currentTrip;
  const getPersonFunction = useContext(TripDataContext).getPersonById;

  useEffect(() => {}, [currentActiveModal]);

  if (
    currentActiveTrip &&
    currentActiveTrip.activityList &&
    currentActiveTrip.activityList.length > 0
  ) {
    return (
      <div className="w-full flex flex-col items-center justify-start gap-4 mt-4">
        {currentActiveTrip.activityList.map((activity) => {
          return (
            <button
              key={activity.id}
              style={{
                backgroundColor: `${
                  getColorById(currentActiveTrip.themeId).bgColor
                }`,
                backgroundImage: `${
                  getColorById(currentActiveTrip.themeId).bgImage
                }`,
                boxShadow: `0px 2px 15px 5px ${
                  getColorById(currentActiveTrip.themeId).bgColor
                }25`,
              }}
              className="hoverTransformZ w-full rounded-lg text-white font-semibold px-4 py-2"
            >
              {/* top row */}
              <div className="w-full my-2" />
              <div className="w-full flex items-center justify-between">
                <span className="text-lg font-bold">{activity.title}</span>
                <span className="bg-white text-black rounded-full my-3 px-5 font-normal">
                  $ {activity.cost}
                </span>
              </div>
              {/* divider */}
              <div className="w-full px-1">
                <div className="w-full h-1 bg-white/30 rounded-full" />
              </div>
              {/* bottom row */}
              <div className="w-full flex flex-col items-center justify-center">
                {/* payer */}
                <div className="w-full flex items-center justify-center pt-3">
                  <div className="flex items-center justify-start px-3 py-1 bg-gray-200/30 rounded-full">
                    <span className="text-gray-800 font-normal">
                      Payed by:{" "}
                    </span>
                    <span className="pl-2 font-normal">
                      {getPersonFunction(activity.payerId)}
                    </span>
                  </div>
                </div>
                {/* participants */}
                <div className="w-full flex flex-col items-start justify-center">
                  {activity.participantList.map((participant) => {
                    if (participant.isParticipating) {
                      return (
                        <span
                          key={participant.participantId}
                          className="font-normal"
                        >
                          {getPersonFunction(participant.participantId)}
                        </span>
                      );
                    }
                  })}
                </div>
              </div>
              {/* spacer */}
              <div className="w-full my-4" />
            </button>
          );
        })}
        <div className="w-full h-32" />
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col items-center justify-center my-2 text-gray-500 font-light">
        <span>To add activities,</span>
        <span>use the "ADD +" button</span>
      </div>
    );
  }
};

export default ActivityListView;
