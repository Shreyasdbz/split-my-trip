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
