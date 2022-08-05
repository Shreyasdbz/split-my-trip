/** @format */

/**
 *
 */
declare interface ITripPerson {
  id: string;
  name: string;
}

/**
 *
 */
declare interface IActivityParticipant {
  participantId: string;
  isParticipating: boolean;
}

/**
 *
 */
declare interface ITripActivity {
  id: string;
  title: string;
  cost: number;
  payerId: string;
  participantList: IActivityParticipant[];
}

/**
 * Interface for modeling the trip data stored in firebase
 * in a single trip document
 */
declare interface ITripData {
  id: string;
  title: string;
  owned?: boolean;
  tripSaved?: boolean;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  themeId: string;
  personList: ITripPerson[] | null;
  activityList: ITripActivity[] | null;
}

/**
 *
 */
declare interface IUserDoc {
  name: string;
  email: string;
  ownedTrips: string[] | null;
  sharedTrips: string[] | null;
}

declare interface ISplitTransaction {
  //
}
