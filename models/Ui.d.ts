/** @format */

declare type ActiveModalTypes =
  | "NONE"
  | "USER_SETTINGS"
  | "NEW_TRIP"
  | "EDIT_TRIP"
  | "ADD_PERSON"
  | "EDIT_PERSON"
  | "ADD_ACTIVITY"
  | "EDIT_ACTIVITY";

declare interface IBasicModalActions {
  action: "OPEN" | "CLOSE";
}

declare interface IEditModalActions {
  action: "OPEN" | "CLOSE" | "SAVE" | "DELETE";
}
