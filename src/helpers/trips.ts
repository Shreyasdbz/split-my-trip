/** @format */

import { TripType } from "../interfaces/tripObjects";

//
// ** Returns a random name that shows up as a default
//      value when activating the new trip modal
//
export function getRandomTripName() {
  //
  let sampleTripNames = [
    "Texas Road Trip",
    "Birthday Party",
    "Europe",
    "Florida",
    "Spain",
    "South Africa",
    "England",
    "France",
    "Germany",
    "California",
    "New York City",
    "Los Angeles",
    "Dallas",
    "Virginia",
    "Dubai",
    "Paris",
    "Rome",
    "Vietnam",
    "Greece",
    "Barcelona",
    "Istanbul",
    "Iceland",
    "Morocco",
    "Thailand",
    "Cancun",
    "Florence",
    "Haiti",
    "Panama",
    "New Zealand",
    "Bora Bora",
    "Maui",
    "Tahiti",
    "Phuket",
    "Tokyo",
    "Beijing",
    "Glacier National Park",
    "Maldives",
    "Yellowstone National Park",
    "Yosemite National Park",
    "SSequoia National Park",
    "Joshua Tree National Park",
    "Grand Canyon",
    "Zion National Park",
    "Banf",
    "Bali",
    "Sydney",
    "Machu Pichu",
    "St. Lucia",
    "Napoli",
    "Santorini",
    "Vancouver",
    "Toronto",
    "Niagra Falls",
    "San Francisco",
    "Amalfi Coast",
  ];

  const randIndex = Math.floor(Math.random() * sampleTripNames.length);
  return sampleTripNames[randIndex];
}

//
// ** JSON Stringifies each trip and returns an array
//
export function encodeTrips(tripsList: TripType[]): string[] {
  let encodedTrips: string[] = [];
  for (let t of tripsList) {
    encodedTrips.push(JSON.stringify(t));
  }
  return encodedTrips;
}

//
// ** JSON Parses each trip and returns an array
//
export const decodeTrips = (encodedTrips: string[]) => {
  let decodedTrips: TripType[] = [];
  for (let t of encodedTrips) {
    decodedTrips.push(JSON.parse(t));
  }
  return decodedTrips;
};
