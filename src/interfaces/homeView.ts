/** @format */

type NewTripBasicType = {
  action: "OPEN" | "CLOSE";
};

type NewTripAddType = {
  action: "CONFIRM";
  title: string;
  colorId: number;
};

export type NewTripTypes = NewTripBasicType | NewTripAddType;
