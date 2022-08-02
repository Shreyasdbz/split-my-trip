/** @format */

declare type ActiveModalTypes =
  | "NONE"
  | "USER_SETTINGS"
  | "NEW_TRIP"
  | "EDIT_TRIP"
  | "ADD_PARTICIPANT"
  | "EDIT_PARTICIPANT"
  | "ADD_ACTIVITY"
  | "EDIT_ACTIVITY";

declare interface IBasicModalActions {
  action: "OPEN" | "CLOSE";
}

type _basic_modal_types = {
  action: "OPEN" | "CLOSE";
};
type _save_new_trip_modal_type = {
  action: "SAVE";
  newTripName: string;
  newTripThemeId: string;
};

declare interface INewTripModalActions {
  payload: _basic_modal_types | _save_new_trip_modal_type;
}
