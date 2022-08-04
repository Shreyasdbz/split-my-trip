/** @format */

import { v4 as uuidv4 } from "uuid";

/**
 * Creates an empty trip object with given params
 * @param title
 * @param themeId
 * @param ownerName
 * @param ownerEmail
 */
const createNewEmptyTrip = (
  title: string,
  themeId: string,
  ownerId: string,
  ownerName: string,
  ownerEmail: string
): ITripData => {
  let newTrip: ITripData = {
    id: uuidv4(),
    title: title,
    ownerId: ownerId,
    ownerName: ownerName,
    ownerEmail: ownerEmail,
    themeId: themeId,
    personList: [],
    activityList: [],
  };
  return newTrip;
};

export { createNewEmptyTrip };
