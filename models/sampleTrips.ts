/** @format */

function getSampleTripData(
  uid1: string,
  uid2: string,
  ownerName: string,
  ownerEmail: string
) {
  const campingTrip: ITripData = {
    id: uid1,
    title: 'Camping Trip 🏕',
    ownerName: ownerName,
    ownerEmail: ownerEmail,
    themeId: 'initi-4',
    personList: [
      {
        id: 'person-1',
        name: 'Jacky',
      },
      {
        id: 'person-2',
        name: 'Mike',
      },
      {
        id: 'person-3',
        name: 'Dave',
      },
    ],
    activityList: [
      {
        id: 'activity-1',
        title: 'Gas ⛽️',
        cost: 45,
        payerId: 'person-2',
        participantList: [
          { participantId: 'person-1', isParticipating: true },
          { participantId: 'person-2', isParticipating: true },
          { participantId: 'person-3', isParticipating: true },
        ],
      },
      {
        id: 'activity-2',
        title: 'Friday Dinner',
        cost: 115,
        payerId: 'person-1',
        participantList: [
          { participantId: 'person-1', isParticipating: true },
          { participantId: 'person-2', isParticipating: true },
          { participantId: 'person-3', isParticipating: false },
        ],
      },
      {
        id: 'activity-3',
        title: 'Smores',
        cost: 20,
        payerId: 'person-2',
        participantList: [
          { participantId: 'person-1', isParticipating: true },
          { participantId: 'person-2', isParticipating: false },
          { participantId: 'person-3', isParticipating: true },
        ],
      },
    ],
  };

  const officeParty: ITripData = {
    id: uid2,
    title: 'Office Party 🎉',
    ownerName: ownerName,
    ownerEmail: ownerEmail,
    themeId: 'initi-4',
    personList: [
      {
        id: 'person-1',
        name: 'Alea',
      },
      {
        id: 'person-2',
        name: 'Luke',
      },
      {
        id: 'person-3',
        name: 'Neel',
      },
      {
        id: 'person-4',
        name: 'Shreyas',
      },
      {
        id: 'person-5',
        name: 'Jasmine',
      },
    ],
    activityList: [
      {
        id: 'activity-1',
        title: 'Supplies',
        cost: 74,
        payerId: 'person-2',
        participantList: [
          { participantId: 'person-1', isParticipating: true },
          { participantId: 'person-2', isParticipating: true },
          { participantId: 'person-3', isParticipating: true },
          { participantId: 'person-4', isParticipating: true },
          { participantId: 'person-5', isParticipating: true },
        ],
      },
      {
        id: 'activity-2',
        title: 'Cupcakes 🧁',
        cost: 90,
        payerId: 'person-4',
        participantList: [
          { participantId: 'person-1', isParticipating: true },
          { participantId: 'person-2', isParticipating: false },
          { participantId: 'person-3', isParticipating: true },
          { participantId: 'person-4', isParticipating: true },
          { participantId: 'person-5', isParticipating: false },
        ],
      },
      {
        id: 'activity-3',
        title: 'Space Rental',
        cost: 600,
        payerId: 'person-4',
        participantList: [
          { participantId: 'person-1', isParticipating: true },
          { participantId: 'person-2', isParticipating: true },
          { participantId: 'person-3', isParticipating: true },
          { participantId: 'person-4', isParticipating: true },
          { participantId: 'person-5', isParticipating: true },
        ],
      },
      {
        id: 'activity-4',
        title: 'Pizza 🍕',
        cost: 60,
        payerId: 'person-5',
        participantList: [
          { participantId: 'person-1', isParticipating: false },
          { participantId: 'person-2', isParticipating: false },
          { participantId: 'person-3', isParticipating: true },
          { participantId: 'person-4', isParticipating: true },
          { participantId: 'person-5', isParticipating: true },
        ],
      },
    ],
  };

  return [campingTrip, officeParty];
}

export { getSampleTripData };
