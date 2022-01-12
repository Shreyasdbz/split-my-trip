/** @format */

import { PersonType, ActivityType } from "./tripObjects";
/** @format */

type BasicModalType = {
  action: "OPEN" | "CLOSE";
};

//
// EDIT TRIP MODAL
//
type EditTripConfirmType = {
  action: "CONFIRM";
  title: string;
  colorId: number;
  toDelete: boolean;
};
export type EditTripTypes = BasicModalType | EditTripConfirmType;

//
// ADD PERSON MODAL
//
type AddPersonConfirmType = {
  action: "CONFIRM";
  name: string;
};
export type AddPersonTypes = BasicModalType | AddPersonConfirmType;

//
// EDIT PERSON MODAL
//
type EditPersonOpenType = {
  action: "OPEN";
  person: PersonType;
};
type EditPersonCloseType = {
  action: "CLOSE";
};
type EditPersonConfirmType = {
  action: "CONFIRM";
  person: PersonType;
  toDelete: boolean;
};
export type EditPersonTypes =
  | EditPersonOpenType
  | EditPersonCloseType
  | EditPersonConfirmType;

// ADD ACTIVITY MODAL
//
type AddActivityConfirmType = {
  action: "CONFIRM";
  activity: ActivityType;
};
export type AddActivityTypes = BasicModalType | AddActivityConfirmType;
