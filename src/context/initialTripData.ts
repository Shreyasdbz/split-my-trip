/** @format */

import { TripType } from "../interfaces/tripObjects";

let sampleTrip1: TripType = {
  id: "sampleTripId001",
  title: "Camping",
  colorId: 5,
  peopleList: [
    {
      id: "trip1Person1",
      name: "Amy",
    },
    {
      id: "trip1Person2",
      name: "Eric",
    },
    {
      id: "trip1Person3",
      name: "Alexi",
    },
  ],
  activityList: [
    {
      id: "trip1Activity1",
      title: "Campsite & Tent",
      cost: 80,
      payerId: "trip1Person1",
      participantList: ["trip1Person1", "trip1Person2", "trip1Person3"],
    },
    {
      id: "trip1Activity2",
      title: "Gas",
      cost: 64,
      payerId: "trip1Person1",
      participantList: ["trip1Person1", "trip1Person2", "trip1Person3"],
    },
    {
      id: "trip1Activity3",
      title: "Food",
      cost: 140,
      payerId: "trip1Person3",
      participantList: ["trip1Person1", "trip1Person2", "trip1Person3"],
    },
  ],
};

let sampleTrip2: TripType = {
  id: "sampleTripId002",
  title: "Colorado",
  colorId: 1,
  peopleList: [
    {
      id: "trip1Person1",
      name: "Jack",
    },
    {
      id: "trip1Person2",
      name: "Zoe",
    },
    {
      id: "trip1Person3",
      name: "Mike",
    },
    {
      id: "trip1Person4",
      name: "Harper",
    },
  ],
  activityList: [
    {
      id: "trip1Activity1",
      title: "Kayak Rentals",
      cost: 320,
      payerId: "trip1Person2",
      participantList: [
        "trip1Person1",
        "trip1Person2",
        "trip1Person3",
        "trip1Person4",
      ],
    },
    {
      id: "trip1Activity2",
      title: "Hotel Stay",
      cost: 742,
      payerId: "trip1Person1",
      participantList: [
        "trip1Person1",
        "trip1Person2",
        "trip1Person3",
        "trip1Person4",
      ],
    },
    {
      id: "trip1Activity3",
      title: "Flight Tickets",
      cost: 490,
      payerId: "trip1Person3",
      participantList: [
        "trip1Person1",
        "trip1Person2",
        "trip1Person3",
        "trip1Person4",
      ],
    },
    {
      id: "trip1Activity4",
      title: "Saturday Dinner",
      cost: 155,
      payerId: "trip1Person4",
      participantList: [
        "trip1Person1",
        "trip1Person2",
        "trip1Person3",
        "trip1Person4",
      ],
    },
  ],
};

let sampleTrip3: TripType = {
  id: "sampleTripId003",
  title: "Office Party",
  colorId: 8,
  peopleList: [
    {
      id: "trip1Person1",
      name: "Neha",
    },
    {
      id: "trip1Person2",
      name: "Alex",
    },
    {
      id: "trip1Person3",
      name: "Peter",
    },
    {
      id: "trip1Person4",
      name: "Jay",
    },
    {
      id: "trip1Person5",
      name: "Anya",
    },
    {
      id: "trip1Person6",
      name: "Charles",
    },
  ],
  activityList: [
    {
      id: "trip1Activity1",
      title: "Cake",
      cost: 85,
      payerId: "trip1Person2",
      participantList: [
        "trip1Person1",
        "trip1Person2",
        "trip1Person3",
        "trip1Person4",
        "trip1Person5",
        "trip1Person6",
      ],
    },
    {
      id: "trip1Activity2",
      title: "Decorations",
      cost: 140,
      payerId: "trip1Person5",
      participantList: [
        "trip1Person1",
        "trip1Person2",
        "trip1Person3",
        "trip1Person4",
        "trip1Person5",
        "trip1Person6",
      ],
    },
    {
      id: "trip1Activity3",
      title: "Dinner",
      cost: 405,
      payerId: "trip1Person2",
      participantList: [
        "trip1Person1",
        "trip1Person2",
        "trip1Person3",
        "trip1Person4",
        "trip1Person5",
        "trip1Person6",
      ],
    },
    {
      id: "trip1Activity4",
      title: "Space Rental",
      cost: 600,
      payerId: "trip1Person1",
      participantList: [
        "trip1Person1",
        "trip1Person2",
        "trip1Person3",
        "trip1Person4",
        "trip1Person5",
        "trip1Person6",
      ],
    },
  ],
};

export const initialTripData = [sampleTrip1, sampleTrip2, sampleTrip3];
