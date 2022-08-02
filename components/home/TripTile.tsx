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
      className="w-full h-24 my-4 shadow-lg rounded-xl flex items-end justify-start px-4 py-4"
      style={{
        backgroundColor: `${getColorById(themeId).bgColor}`,
        backgroundImage: `${getColorById(themeId).bgImage}`,
      }}
      onClick={() => {
        nextRouter.push(`/trip/${tripId}`);
      }}
    >
      <span className="text-white text-2xl font-bold">{text}</span>
    </button>
  );
};

export default TripTile;
