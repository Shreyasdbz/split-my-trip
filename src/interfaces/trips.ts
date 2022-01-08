/** @format */

export type PersonType = {
  id: string;
  name: string;
};

export type ActivityParticipant = {
  participant: PersonType;
  participating: boolean;
};

export type ActivityType = {
  id: string;
  title: string;
  cost: number;
  payer: PersonType;
  participantList: ActivityParticipant[];
};

export type TripType = {
  id: string;
  title: string;
  createdAt: number;
  colorId: number;
  peopleList: PersonType[];
  activityList: ActivityType[];
};
