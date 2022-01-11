/** @format */

type HandleEditTripBasicType = {
  action: "OPEN" | "CLOSE";
};

type HandleEditTripCONFIRMType = {
  action: "CONFIRM";
  title: string;
  colorId: number;
  deleteTrip: boolean;
};

export type HandleEditTripTypes =
  | HandleEditTripBasicType
  | HandleEditTripCONFIRMType;
