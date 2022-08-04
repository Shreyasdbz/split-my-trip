/** @format */

import { useContext } from "react";
import Image from "next/image";

import { UserCircleIcon } from "@heroicons/react/outline";

import { TripDataContext } from "../../context/TripDataContext";
import { UiContext } from "../../context/UiContext";

import HeaderTitle from "../core/HeaderTitle";

interface IHeader {
  type: "home" | "trip";
}
const Header = () => {
  const currentUserImage = useContext(TripDataContext).currentUser?.photoURL;
  const handler = useContext(UiContext).handleUserSettings;
  return (
    <div className="w-screen h-36 bg-white shadow-lg rounded-br-3xl rounded-bl-3xl flex items-center justify-between px-4 sticky pt-4">
      <HeaderTitle text="Split My Trip" />
      <button
        className="w-12 h-12 relative rounded-full shadow-md border-2 border-slate-400"
        onClick={() => {
          handler({ action: "OPEN" });
        }}
      >
        {currentUserImage ? (
          <Image
            src={currentUserImage}
            layout="fill"
            className="rounded-full"
          />
        ) : (
          <UserCircleIcon className="text-slate-700 h-12 w-12" />
        )}
      </button>
    </div>
  );
};

export default Header;
