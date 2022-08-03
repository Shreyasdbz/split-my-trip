/** @format */

import { useContext, useEffect } from "react";

import { UiContext } from "../../context/UiContext";
import { TripDataContext } from "../../context/TripDataContext";

import { getColorById } from "../../lib/util/theme";

const PersonListView = () => {
  const currentActiveModal = useContext(UiContext).currentModalActive;
  const currentActiveTrip = useContext(TripDataContext).currentTrip;

  useEffect(() => {}, [currentActiveModal]);

  if (currentActiveTrip.personList && currentActiveTrip.personList.length > 0) {
    return (
      <div className="w-full flex flex-row items-center justify-start gap-4 overflow-scroll mb-2 pl-4">
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
              className="bg-gray-300 px-3 py-2 my-4 rounded-md shadow-lg shadow-gray-200 text-white font-semibold"
            >
              {person.name}
            </button>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <div>Add People yo</div>
      </div>
    );
  }
};

export default PersonListView;
