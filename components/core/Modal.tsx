/** @format */

import { useContext } from "react";
import { UiContext } from "../../context/UiContext";

interface IModal {
  children: React.ReactElement | React.ReactElement[];
}
const Modal = ({ children }: IModal) => {
  const dismissAll = useContext(UiContext).dismissAllModals;

  //TODO: Add escape key dismiss

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-start fixed z-30 overflow-y-scroll"
      onClick={() => dismissAll()}
    >
      <div
        className="bg-white px-8 py-14 mt-10 rounded-lg shadow-lg w-80 md:w-96 lg:w-128"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      {/* spacer */}
      <div className="w-full h-2 my-12" />
    </div>
  );
};

export default Modal;
