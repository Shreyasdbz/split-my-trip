/** @format */

import { getColorById } from "../../models/Colors";

interface ITripTile {
  text: string;
  themeId: string;
}
const TripTile = ({ text, themeId }: ITripTile) => {
  return (
    <button
      className="w-full h-24 my-4 shadow-lg rounded-xl flex items-end justify-start px-4 py-4"
      style={{
        backgroundColor: `${getColorById(themeId).bgColor}`,
        backgroundImage: `${getColorById(themeId).bgImage}`,
      }}
    >
      <span className="text-white text-2xl font-bold">{text}</span>
    </button>
  );
};

export default TripTile;
