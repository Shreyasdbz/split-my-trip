/** @format */

import {
  PersonType,
  ActivityParticipant,
  ActivityType,
  TripType,
} from "../interfaces/trips";

let person1: PersonType = {
  id: "pers0001",
  name: "Jack",
};
let person2: PersonType = {
  id: "person00002",
  name: "Zoe",
};
let person3: PersonType = {
  id: "person00003",
  name: "Diego",
};
let person4: PersonType = {
  id: "person00004",
  name: "Laura",
};
let person5: PersonType = {
  id: "person00006",
  name: "Juan",
};

let peopleList: PersonType[] = [person1, person2, person3, person4, person5];

let act1p1: ActivityParticipant = {
  participant: person1,
  participating: true,
};
let act1p2: ActivityParticipant = {
  participant: person2,
  participating: true,
};
let act1p3: ActivityParticipant = {
  participant: person3,
  participating: true,
};
let act1p4: ActivityParticipant = {
  participant: person4,
  participating: false,
};
let act1p5: ActivityParticipant = {
  participant: person5,
  participating: false,
};

let activity1: ActivityType = {
  id: "act0001",
  title: "Boating",
  cost: 50,
  payer: person1,
  participantList: [act1p1, act1p2, act1p3, act1p4, act1p5],
};

let activity2: ActivityType = {
  id: "act0002",
  title: "Kayaking",
  cost: 4020,
  payer: person2,
  participantList: [act1p1, act1p2, act1p3, act1p4, act1p5],
};

let activity3: ActivityType = {
  id: "act0003",
  title: "Driving - Gas",
  cost: 90,
  payer: person5,
  participantList: [act1p1, act1p2, act1p3, act1p4, act1p5],
};

let activity4: ActivityType = {
  id: "act0004",
  title: "Campsite",
  cost: 400,
  payer: person2,
  participantList: [act1p1, act1p2, act1p3, act1p4, act1p5],
};

let activity5: ActivityType = {
  id: "act0005",
  title: "Hotel Stay",
  cost: 50000,
  payer: person2,
  participantList: [act1p1, act1p2, act1p3, act1p4, act1p5],
};

let tripA: TripType = {
  id: "trip0001",
  title: "Camping",
  createdAt: 520,
  colorId: 1,
  peopleList: peopleList,
  activityList: [activity1, activity2, activity3, activity4, activity5],
};

let tripB: TripType = {
  id: "trip0002",
  title: "Glamping",
  createdAt: 528,
  colorId: 3,
  peopleList: peopleList,
  activityList: [activity1, activity2, activity3, activity4, activity5],
};

let tripC: TripType = {
  id: "trip0003",
  title: "Some really long name",
  createdAt: 530,
  colorId: 4,
  peopleList: peopleList,
  activityList: [activity1, activity2, activity3, activity4, activity5],
};

let tripD: TripType = {
  id: "trip0004",
  title: "Some even longer trip name thing",
  createdAt: 532,
  colorId: 5,
  peopleList: peopleList,
  activityList: [activity1, activity2, activity3, activity4, activity5],
};

export const sampleTripData = [tripA, tripB, tripC, tripD];
