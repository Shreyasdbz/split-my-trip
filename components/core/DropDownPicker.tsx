/** @format */

import { useState } from "react";

import { ChevronRightIcon } from "@heroicons/react/solid";

interface IDropDownItem {
  id: string;
  description: string;
}
interface IDropDownPicker {
  itemList: IDropDownItem[];
  currentSelectedId: string;
  onPick: (id: string) => void;
}
const DropDownPicker = ({
  itemList,
  currentSelectedId,
  onPick,
}: IDropDownPicker) => {
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);

  function getItemDescriptionById(id: string) {
    let desc = "";
    for (let i of itemList) {
      if (i.id === id) desc = i.description;
    }
    return desc;
  }

  return (
    //   wrapper
    <div className="hideScrollBars w-full flex flex-col items-center justify-center relative rounded-lg overflow-hidden mb-2">
      {/* selection highlight  */}
      <button
        className="w-full flex flex-row items-center justify-between bg-gray-100 focus:bg-gray-200 outline-2 outline-gray-200 rounded-md px-2 py-1"
        onClick={() => {
          setPickerOpen(!pickerOpen);
        }}
      >
        <span className="font-light">
          {getItemDescriptionById(currentSelectedId)}
        </span>
        <ChevronRightIcon
          className={`w-8 h-8 text-gray-600 ${pickerOpen ? "rotate-90" : ""}`}
        />
      </button>

      {/* picker drowndown */}
      {pickerOpen && (
        // <div className="w-full flex flex-col items-start justify-center gap-2 py-1 border-l-2 border-r-2 border-b-2 rounded-b-lg rounded-tl-md rounded-tr-md">
        <div className="w-full flex flex-col items-start justify-center gap-2 py-1 border-l-2 border-r-2 border-b-2 rounded-b-lg">
          {itemList.map((i) => {
            return (
              <button
                key={i.id}
                className={`hoverTransformScale pl-2 ${
                  currentSelectedId === i.id ? "font-semibold" : "font-light"
                }`}
                onClick={() => {
                  onPick(i.id);
                  setPickerOpen(false);
                }}
              >
                {i.description}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDownPicker;
