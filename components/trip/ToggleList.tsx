/** @format */

import { useContext } from "react";

import { TripDataContext } from "../../context/TripDataContext";

import { getColorById } from "../../lib/util/theme";

interface IToggleSwitch extends IToggleListItem {
  onToggleHandler: () => void;
}
const ToggleSwitch = ({ currentState, onToggleHandler }: IToggleSwitch) => {
  const currentActiveTrip = useContext(TripDataContext).currentTrip;

  if (!currentActiveTrip) {
    return <></>;
  }

  function getBackgroundColor(): string {
    let final = "";
    if (!currentActiveTrip) return final;
    if (currentState === true) {
      final = `${getColorById(currentActiveTrip.themeId).bgColor}`;
    } else {
      return "";
    }
    return final;
  }
  function getBackgroundImage(): string {
    let final = "";
    if (!currentActiveTrip) return final;
    if (currentState === true) {
      final = `${getColorById(currentActiveTrip.themeId).bgImage}`;
    } else {
      return "";
    }
    return final;
  }
  function getShadow(): string {
    let final = "";
    if (!currentActiveTrip) return final;
    if (currentState === true) {
      final = `0px 2px 15px 5px ${
        getColorById(currentActiveTrip.themeId).bgColor
      }10`;
    } else {
      return "";
    }
    return final;
  }

  return (
    <div
      className="flex h-full items-center"
      onClick={() => {
        onToggleHandler();
      }}
    >
      <div
        style={{
          backgroundColor: getBackgroundColor(),
          backgroundImage: getBackgroundImage(),
          boxShadow: getShadow(),
        }}
        className={`flex h-8 items-center w-14 border-2 border-gray-200 rounded-full ${
          currentState === true ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`w-8 h-8 border-2 border-gray-300 rounded-full ${
            currentState === true
              ? "translate-x-0.5 bg-white "
              : "-translate-x-0.5 scale-75 bg-gray-200"
          }`}
        ></div>
      </div>
    </div>
  );
};

interface IToggleListItem {
  id: string;
  description: string;
  currentState: boolean;
  isDisabled?: boolean;
}
interface IToggleList {
  items: IToggleListItem[];
  onItemToggle: (id: string) => void;
}
const ToggleList = ({ items, onItemToggle }: IToggleList) => {
  const currentActiveTrip = useContext(TripDataContext).currentTrip;

  if (!currentActiveTrip) {
    return <></>;
  }

  return (
    <div className="w-full flex flex-col items-start justify-center gap-1">
      {items.map((i) => {
        return (
          <div
            key={i.id}
            className="w-full border-2 focus:outline-2 focus:outline-gray-300 border-gray-100 rounded-lg flex flow-row items-start justify-between px-2 py-2"
          >
            <span className="font-light translate-y-1">{i.description}</span>
            <ToggleSwitch
              id={i.id}
              description={i.description}
              currentState={i.currentState}
              onToggleHandler={() => {
                onItemToggle(i.id);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ToggleList;
