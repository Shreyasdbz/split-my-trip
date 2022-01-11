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
  deleteTrip: boolean;
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
type EditPersonConfirmType = {
  action: "CONFIRM";
  id: string;
  name: string;
};
export type EditPersonTypes = BasicModalType | EditPersonConfirmType;
