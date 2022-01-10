/** @format */

type NewTripBaicType = {
  action: "OPEN" | "CLOSE";
};

type NewTripAddType = {
  action: "CONFIRM";
  title: string;
  colorId: number;
};

export type NewTripTypes = NewTripBaicType | NewTripAddType;
