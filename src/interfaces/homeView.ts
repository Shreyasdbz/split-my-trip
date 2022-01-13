/** @format */

type ModalBasicType = {
  action: "OPEN" | "CLOSE";
};

type NewTripAddType = {
  action: "CONFIRM";
  title: string;
  colorId: number;
};

export type NewTripTypes = ModalBasicType | NewTripAddType;

type UserSettingsConfirmType = {
  action: "CONFIRM";
  type: "TOGGLE THEME" | "LOGOUT";
};

export type UserSettingsType = ModalBasicType | UserSettingsConfirmType;
