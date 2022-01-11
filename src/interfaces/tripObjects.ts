/** @format */

import { Timestamp } from "@firebase/firestore-types";

export type PersonType = {
  id: string;
  name: string;
};

export type ActivityParticipant = {
  participantId: string;
  participating: boolean;
};

export type ActivityType = {
  id: string;
  title: string;
  cost: number;
  payerId: string;
  participantList: ActivityParticipant[];
};

export type TripType = {
  id: string;
  title: string;
  colorId: number;
  peopleList: PersonType[];
  activityList: ActivityType[];
};
