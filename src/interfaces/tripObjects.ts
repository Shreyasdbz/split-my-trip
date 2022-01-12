/** @format */

export type PersonType = {
  id: string;
  name: string;
};

export type ActivityParticipantType = {
  participantId: string;
  participating: boolean;
};

export type ActivityType = {
  id: string;
  title: string;
  cost: number;
  payerId: string;
  participantList: ActivityParticipantType[];
};

export type TripType = {
  id: string;
  title: string;
  colorId: number;
  peopleList: PersonType[];
  activityList: ActivityType[];
};
