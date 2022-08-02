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
      className="w-screen h-screen flex items-start justify-center fixed z-30"
      onClick={() => dismissAll()}
    >
      <div
        className="bg-white px-8 py-14 mt-10 rounded-lg shadow-lg min-w-modalSmall md:min-w-modalMedium lg:min-w-modalLarge"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
