/** @format */

import { useContext, useEffect } from "react";

import { UiContext } from "../../context/UiContext";
import { TripDataContext } from "../../context/TripDataContext";

import { getColorById } from "../../lib/util/theme";

const PersonListView = () => {
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const currentActiveTrip = useContext(TripDataContext).currentTrip;

  useEffect(() => {}, [currentActiveModal]);

  if (
    currentActiveTrip &&
    currentActiveTrip.personList &&
    currentActiveTrip.personList.length > 0
  ) {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full flex flex-row items-center justify-cetner gap-4 overflow-scroll pl-4">
          {currentActiveTrip.personList.map((person) => {
            return (
              <button
                key={person.id}
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
                className="hoverTransformZ bg-gray-300 px-3 py-2 my-4 min-h-12 rounded-md shadow-lg shadow-gray-200 text-white font-semibold"
              >
                {person.name}
              </button>
            );
          })}
          <div className="w-8 h-2 mx-6" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col items-center justify-center my-4 text-gray-500 font-light">
        <span>To add people,</span>
        <span>use the "ADD +" button</span>
      </div>
    );
  }
};

export default PersonListView;
