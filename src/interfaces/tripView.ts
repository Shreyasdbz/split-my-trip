/** @format */

type EditTripBasicType = {
  action: "OPEN" | "CLOSE";
};

type EditTripConfirmType = {
  action: "CONFIRM";
  title: string;
  colorId: number;
  deleteTrip: boolean;
};

export type EditTripTypes = EditTripBasicType | EditTripConfirmType;
