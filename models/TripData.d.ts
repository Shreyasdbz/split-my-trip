/** @format */

/**
 *
 */
interface ITripPerson {
  id: string;
  name: string;
}

/**
 *
 */
interface IActivityParticipant {
  participantId: string;
  isParticipating: boolean;
}

/**
 *
 */
interface ITripActivity {
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
interface ITripData {
  id: string;
  title: string;
  owned?: boolean;
  ownerName: string;
  ownerEmail: string;
  themeId: string;
  personList: ITripPerson[] | null;
  activityList: ITripActivity[] | null;
}

/**
 *
 */
interface IUserDoc {
  name: string;
  email: string;
  ownedTrips: string[] | null;
  sharedTrips: string[] | null;
}
