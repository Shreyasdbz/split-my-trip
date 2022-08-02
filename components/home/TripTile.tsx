/** @format */

import { useRouter } from "next/router";

import { getColorById } from "../../models/Colors";

interface ITripTile {
  tripId: string;
  text: string;
  themeId: string;
}
const TripTile = ({ tripId, text, themeId }: ITripTile) => {
  const nextRouter = useRouter();

  return (
    <button
      className="w-full h-32 rounded-2xl flex items-end justify-start px-4 py-4 hover:opacity-90 hoverTransformZ"
      style={{
        backgroundColor: `${getColorById(themeId).bgColor}`,
        backgroundImage: `${getColorById(themeId).bgImage}`,
        boxShadow: `0px 2px 15px 5px ${getColorById(themeId).bgColor}35`,
      }}
      onClick={() => {
        nextRouter.push(`/trip/${tripId}`);
      }}
    >
      <span className="text-white text-3xl font-semibold">{text}</span>
    </button>
  );
};

export default TripTile;
