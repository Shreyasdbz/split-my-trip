/** @format */

/**
 *
 * @param uid1
 * @param uid2
 * @param ownerName
 * @param ownerEmail
 * @returns
 */
function getSampleTripData(
  uid1: string,
  uid2: string,
  uid3: string,
  ownerId: string,
  ownerName: string,
  ownerEmail: string
) {
  const campingTrip: ITripData = {
    id: uid1,
    title: "Camping Trip 🏕",
    ownerId: ownerId,
    ownerName: ownerName,
    ownerEmail: ownerEmail,
    themeId: "init-4",
    personList: [
      {
        id: "person-1",
        name: "Jacky",
      },
      {
        id: "person-2",
        name: "Mike",
      },
      {
        id: "person-3",
        name: "Dave",
      },
    ],
    activityList: [
      {
        id: "activity-1",
        title: "Gas ⛽️",
        cost: 45,
        payerId: "person-2",
        participantList: [
          { participantId: "person-1", isParticipating: true },
          { participantId: "person-2", isParticipating: true },
          { participantId: "person-3", isParticipating: true },
        ],
      },
      {
        id: "activity-2",
        title: "Friday Dinner",
        cost: 115,
        payerId: "person-1",
        participantList: [
          { participantId: "person-1", isParticipating: true },
          { participantId: "person-2", isParticipating: true },
          { participantId: "person-3", isParticipating: false },
        ],
      },
      {
        id: "activity-3",
        title: "Smores Stuff",
        cost: 20,
        payerId: "person-2",
        participantList: [
          { participantId: "person-1", isParticipating: true },
          { participantId: "person-2", isParticipating: false },
          { participantId: "person-3", isParticipating: true },
        ],
      },
    ],
  };
  const officeParty: ITripData = {
    id: uid2,
    title: "Office Party 🎉",
    ownerId: ownerId,
    ownerName: ownerName,
    ownerEmail: ownerEmail,
    themeId: "init-8",
    personList: [
      {
        id: "person-1",
        name: "Alea",
      },
      {
        id: "person-2",
        name: "Luke",
      },
      {
        id: "person-3",
        name: "Neel",
      },
      {
        id: "person-4",
        name: "Shreyas",
      },
      {
        id: "person-5",
        name: "Jasmine",
      },
    ],
    activityList: [
      {
        id: "activity-1",
        title: "Supplies",
        cost: 74,
        payerId: "person-2",
        participantList: [
          { participantId: "person-1", isParticipating: true },
          { participantId: "person-2", isParticipating: true },
          { participantId: "person-3", isParticipating: true },
          { participantId: "person-4", isParticipating: true },
          { participantId: "person-5", isParticipating: true },
        ],
      },
      {
        id: "activity-2",
        title: "Cupcakes 🧁",
        cost: 90,
        payerId: "person-4",
        participantList: [
          { participantId: "person-1", isParticipating: true },
          { participantId: "person-2", isParticipating: false },
          { participantId: "person-3", isParticipating: true },
          { participantId: "person-4", isParticipating: true },
          { participantId: "person-5", isParticipating: false },
        ],
      },
      {
        id: "activity-3",
        title: "Arcade Reservation",
        cost: 600,
        payerId: "person-4",
        participantList: [
          { participantId: "person-1", isParticipating: true },
          { participantId: "person-2", isParticipating: true },
          { participantId: "person-3", isParticipating: true },
          { participantId: "person-4", isParticipating: true },
          { participantId: "person-5", isParticipating: true },
        ],
      },
      {
        id: "activity-4",
        title: "Pizza 🍕",
        cost: 60,
        payerId: "person-5",
        participantList: [
          { participantId: "person-1", isParticipating: false },
          { participantId: "person-2", isParticipating: false },
          { participantId: "person-3", isParticipating: true },
          { participantId: "person-4", isParticipating: true },
          { participantId: "person-5", isParticipating: true },
        ],
      },
    ],
  };
  const sundayBBQ: ITripData = {
    id: uid3,
    title: "Sunday BBQ 🍽️",
    ownerId: ownerId,
    ownerName: ownerName,
    ownerEmail: ownerEmail,
    themeId: "init-1",
    personList: [
      {
        id: "person-1",
        name: "Mr. Garcia",
      },
      { id: "person-2", name: "The Smiths" },
      { id: "person-3", name: "Polly" },
      { id: "person-4", name: "Jace" },
      { id: "person-5", name: "Heather" },
      { id: "person-6", name: "Evan" },
      { id: "person-7", name: "The Russos" },
    ],
    activityList: [
      {
        id: "activity-1",
        title: "Wings",
        cost: 74,
        payerId: "person-1",
        participantList: [
          {
            participantId: "person-1",
            isParticipating: true,
          },
          {
            participantId: "person-2",
            isParticipating: true,
          },
          {
            participantId: "person-3",
            isParticipating: true,
          },
          {
            participantId: "person-4",
            isParticipating: true,
          },
          {
            participantId: "person-5",
            isParticipating: true,
          },
          {
            participantId: "person-6",
            isParticipating: false,
          },
          {
            participantId: "person-7",
            isParticipating: false,
          },
        ],
      },
      {
        id: "activity-2",
        title: "Salad",
        cost: 74,
        payerId: "person-4",
        participantList: [
          {
            participantId: "person-1",
            isParticipating: false,
          },
          {
            participantId: "person-2",
            isParticipating: false,
          },
          {
            participantId: "person-3",
            isParticipating: true,
          },
          {
            participantId: "person-4",
            isParticipating: true,
          },
          {
            participantId: "person-5",
            isParticipating: true,
          },
          {
            participantId: "person-6",
            isParticipating: true,
          },
          {
            participantId: "person-7",
            isParticipating: true,
          },
        ],
      },
      {
        id: "activity-3",
        title: "Drinks",
        cost: 74,
        payerId: "person-4",
        participantList: [
          {
            participantId: "person-1",
            isParticipating: false,
          },
          {
            participantId: "person-2",
            isParticipating: true,
          },
          {
            participantId: "person-3",
            isParticipating: true,
          },
          {
            participantId: "person-4",
            isParticipating: false,
          },
          {
            participantId: "person-5",
            isParticipating: true,
          },
          {
            participantId: "person-6",
            isParticipating: true,
          },
          {
            participantId: "person-7",
            isParticipating: false,
          },
        ],
      },
      {
        id: "activity-4",
        title: "Utensils",
        cost: 74,
        payerId: "person-2",
        participantList: [
          {
            participantId: "person-1",
            isParticipating: true,
          },
          {
            participantId: "person-2",
            isParticipating: true,
          },
          {
            participantId: "person-3",
            isParticipating: true,
          },
          {
            participantId: "person-4",
            isParticipating: true,
          },
          {
            participantId: "person-5",
            isParticipating: true,
          },
          {
            participantId: "person-6",
            isParticipating: true,
          },
          {
            participantId: "person-7",
            isParticipating: true,
          },
        ],
      },
      {
        id: "activity-5",
        title: "Park Rental",
        cost: 74,
        payerId: "person-5",
        participantList: [
          {
            participantId: "person-1",
            isParticipating: true,
          },
          {
            participantId: "person-2",
            isParticipating: true,
          },
          {
            participantId: "person-3",
            isParticipating: true,
          },
          {
            participantId: "person-4",
            isParticipating: true,
          },
          {
            participantId: "person-5",
            isParticipating: true,
          },
          {
            participantId: "person-6",
            isParticipating: true,
          },
          {
            participantId: "person-7",
            isParticipating: true,
          },
        ],
      },
    ],
  };

  return [campingTrip, officeParty, sundayBBQ];
}

/**
 *
 * @returns
 */
function getRandomTripTitle(): string {
  const sampleTitles = [
    "Antartica Trip 🏔️",
    "Alaska Trip 🏔️",
    "Arabia Trip ✈️",
    "New Zeland Trip 🧳",
    "Paris Trip ✈️",
    "Maui Trip 🌴",
    "Bora Bora Trip 🌴",
    "Tahiti Trip 🌴",
    "London Trip ✈️",
    "Rome Trip ✈️",
    "Tukrs & Caicos Trip 🌴",
    "Tokyo Visit 🌄",
    "Maldives Stay 🌴",
    "Phuket Excursion 🌴",
    "Barcelona Trip 🧳",
    "Glacier Natl Park Hike 🏔️",
    "Banff Trip 🏔️",
    "Grand Canyon Stay ⛰️",
    "Costa Rica Trip 🌴",
    "Bali Vacation 🌴",
    "New York City Trip ✈️",
    "Machu Picchu Hike 🏔️",
    "Sydney Night Out 🍺",
    "Dubai Trip ✈️",
    "St. Lucia Vacation 🌴",
    "Florence Excursion 🍕",
    "Yellowstone Camping ⛺",
    "Yosemite Hike 🥾",
    "Rio de Janeiro Trip 🧳",
    "Amalfi Coast Vacation 🧳",
    "Victoria Falls Trip 🧳",
    "Birthday Party 🥳",
    "Austin Trip ✈️",
    "Road Trip 🚙",
    "Boston Visit 🧳",
    "Vancouver Day Trip 🏔️",
    "Cancun Vacation 🌴",
    "Dallas Trip 🧳",
    "Maldives Vacation 🌴",
    "Toronto Visit ✈️",
    "Hackathon Day 🧑‍💻",
    "Museum Visit 📚",
    "Bahamas Cruise 🚢",
    "Istanbul Stay 🏨",
    "Sunday Picnic 🍉",
    "São Paulo ✈️",
    "Cairo ✈️",
    "Buenos Aires ✈️",
    "Mumbai ✈️",
    "Friday Golf ⛳",
    "Weekend BBQ 🍽️",
    "Charleston, SC Trip ✈️",
    "Denver ✈️",
    "Fiji Vacation ✈️",
    "Bangkok ✈️",
    "Seoul ✈️",
    "Wine & Paint 🍷",
    "Music Festival 🎧",
    "Happy Hour 🍻",
  ];

  let title = "";
  title = sampleTitles[Math.floor(Math.random() * sampleTitles.length)];

  return title;
}

/**
 *
 * @returns
 */
function getRandomPersonName(): string {
  const samplePersonNames = [
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
  let name = "";
  name =
    samplePersonNames[Math.floor(Math.random() * samplePersonNames.length)];

  return name;
}

/**
 *
 */
function getRandomCost(): number {
  return Math.floor(Math.random() * 999);
}

export {
  getSampleTripData,
  getRandomTripTitle,
  getRandomPersonName,
  getRandomCost,
};
