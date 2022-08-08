/** @format */

import { useContext, useEffect } from "react";
import { UiContext } from "../../context/UiContext";

interface IModal {
  children: React.ReactElement | React.ReactElement[];
}
const Modal = ({ children }: IModal) => {
  const dismissAll = useContext(UiContext).dismissAllModals;

  const KEY_NAME_ESC = "Escape";
  const KEY_EVENT_TYPE = "keyup";

  function handleKey({ key }: any) {
    if (key === KEY_NAME_ESC) {
      dismissAll();
    }
  }

  useEffect(() => {
    window.addEventListener(KEY_EVENT_TYPE, handleKey);
    return () => {
      window.removeEventListener(KEY_EVENT_TYPE, handleKey);
    };
  });

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
