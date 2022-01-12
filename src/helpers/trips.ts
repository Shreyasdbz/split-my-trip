/** @format */

import {
  ActivityParticipantType,
  PersonType,
  TripType,
} from "../interfaces/tripObjects";

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
    "Sequoia National Park",
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
// ** Returns a random name that shows up as a default
//      value when activating the new person modal
//
export function getRandomPersonName() {
  //
  let samplePersonNames = [
    "Jasmine",
    "Teagan",
    "Zander",
    "Salma",
    "Rohan",
    "Aurora",
    "Shaun",
    "Cameron",
    "Sadie",
    "Javier",
    "Hamza",
    "Drake",
    "Stanley",
    "Regan",
    "Hallie",
    "Kael",
    "Kelsey",
    "Jocelynn",
    "Alvaro",
    "Madisyn",
    "Jaycee",
    "Jeffrey",
    "Teresa",
    "Dorian",
    "Natalee",
    "Celia",
    "Janiah",
    "Mike",
    "Lydia",
    "Roger",
    "Tristan",
    "Julianna",
    "Kelsie",
    "Alexander",
    "Leland",
    "Marcus",
    "Kamren",
    "Bryan",
    "Britney",
    "Kasen",
    "Yosef",
    "Owen",
    "Stephanie",
    "Heidy",
    "Dangelo",
    "Justine",
    "Darren",
    "Myles",
    "Skye",
    "Yasmin",
    "Jacqueline",
    "Sharon",
    "Lauren",
    "Julio",
    "Cristal",
    "Guadalupe",
    "Conor",
    "Jimena",
    "Hazel",
    "Jonathon",
    "Rose",
    "Harley",
    "Theodore",
    "Landen",
    "Kiera",
    "Efrain",
    "Evelyn",
    "Dana",
    "Mina",
    "Maia",
    "Harry",
    "Meadow",
    "Geovanni",
    "Heidi",
    "Brisa",
    "Harley",
    "Kaylee",
    "Coleman",
    "Anabel",
    "Yair",
    "Maggie",
    "Diego",
    "Myah",
    "Terry",
    "Zane",
    "Iliana",
    "Juliette",
    "Laura",
    "Briana",
    "Emelia",
    "Piper",
    "Avah",
    "Jasmin",
    "Lana",
    "Quinten",
    "Arnav",
    "Sonia",
    "Aryan",
    "Belinda",
  ];
  const randIndex = Math.floor(Math.random() * samplePersonNames.length);
  return samplePersonNames[randIndex];
}

//
// ** Returns a random name that shows up as a default
//      value when activating the new activity modal
//
export function getRandomActivityName() {
  //
  let sampleActivityNames = [
    "Lunch",
    "Dinner",
    "Brunch",
    "Skiing",
    "Boat Rentals",
    "Kayak Rentals",
    "Food",
    "Cake",
    "Hotel",
    "AirBnb",
    "Tents",
    "Decorations",
    "Drinks",
    "Golf",
    "Tour Guides",
    "Bus Ticket",
    "Flights",
    "Tickets",
    "Boat",
    "Gas",
    "Breakfast",
    "Materials",
    "Apparel",
    "Pizza",
    "Appetizers",
    "Burgers",
    "Soup",
    "Rice",
    "Soup",
    "Ramen",
    "Soup",
    "Pasta",
    "Salad",
    "Bubble Tea",
    "Coffee",
  ];
  const randIndex = Math.floor(Math.random() * sampleActivityNames.length);
  return sampleActivityNames[randIndex];
}

//
// ** Returns the name of a person given
//      a peopleList
//
export function getPersonNameById(
  id: string,
  peopleList: PersonType[]
): string {
  let personName = "";
  for (let p of peopleList) {
    if (p.id === id) {
      return p.name;
    }
  }
  return personName;
}

//
// ** Builds a participantList based on the
//      people list (Add Activity Only)
//
export function buildParticipantListInitial(
  peopleList: PersonType[]
): ActivityParticipantType[] {
  let participantList: ActivityParticipantType[] = [];
  for (let p of peopleList) {
    let participant: ActivityParticipantType = {
      participantId: p.id,
      participating: true,
    };
    participantList.push(participant);
  }
  return participantList;
}
