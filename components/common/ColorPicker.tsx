/** @format */

import { Dispatch, SetStateAction } from "react";

import { getCurrentColorOptions } from "../../lib/util/theme";

interface IColorPicker {
  currentColor: string;
  onColorChange: Dispatch<SetStateAction<string>>;
}
const ColorPicker = ({ currentColor, onColorChange }: IColorPicker) => {
  const colorPalette = getCurrentColorOptions();

  return (
    <div className="flex flex-row items-center justify-start px-4 rounded-full gap-4">
      {colorPalette.map((color) => {
        return (
          <button
            key={color.id}
            style={{
              backgroundColor: `${color.bgColor}`,
              backgroundImage: `${color.bgImage}`,
              boxShadow: `0px 2px 15px 5px ${color.bgColor}25`,
            }}
            className={`h-14 w-14 rounded-full my-4 border-4 ${
              currentColor === color.id ? "border-black" : "border-gray-200"
            }`}
            onClick={() => {
              onColorChange(color.id);
            }}
          />
        );
      })}
    </div>
  );
};

export default ColorPicker;
