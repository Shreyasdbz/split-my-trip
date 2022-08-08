/** @format */

import { useRouter } from "next/router";
import { User } from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";

import { FirebaseConfig } from "../lib/firebase/config";
import { FirebaseDb } from "../lib/firebase/db";
import { StorageQueue } from "../lib/StorageQueue";

import { getSampleTripData } from "../lib/util/sampleData";
import { createNewEmptyTrip } from "../lib/util/trip";

interface ITripDataContext {
  currentUser: User | null;
  trips: ITripData[];
  currentTrip: ITripData | null;
  currentPersonEditId: string | null;
  currentActivityEditId: string | null;
  resetAllCurrent: () => void;
  performUserLogin: (loginUser: User) => void;
  refreshCachedTrips: () => void;
  addNewTrip: (name: string, themeId: string) => Promise<void>;
  editTripDetails: (
    newTripName: string,
    newTripTheme: string,
    deleteTrip?: boolean
  ) => Promise<void>;
  changeCurrentTrip: (id: string, useLocal: boolean) => void;
  saveSharedTrip: (tripId: string) => Promise<void>;
  getPersonById: (personId: string) => string;
  addNewPerson: (personName: string) => Promise<void>;
  editPerson: (
    { action }: IEditModalActions,
    editPersonInputId: string,
    newName?: string
  ) => Promise<void>;
  addActivity: ({
    title,
    cost,
    payerId,
    participantList,
  }: Omit<ITripActivity, "id">) => Promise<void>;
  editActivity: (
    { action }: IEditModalActions,
    editActivityId: string,
    newTitle?: string,
    newCost?: number,
    newPayerId?: string,
    newParticipantList?: IActivityParticipant[]
  ) => Promise<void>;
  getActivityById: (id: string) => ITripActivity | null;
}

export const TripDataContext = createContext({} as ITripDataContext);

interface ITripDataContextProvider {
  children: React.ReactElement | React.ReactElement[];
}
const TripDataContextProvider = ({ children }: ITripDataContextProvider) => {
  const nextRouter = useRouter();
  const [user] = useAuthState(FirebaseConfig.auth);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<ITripData[]>([]);
  const [currentTrip, setCurrentTrip] = useState<ITripData | null>(null);
  const [currentPersonEditId, setcurrentPersonEditId] = useState<string | null>(
    null
  );
  const [currentActivityEditId, setcurrentActivityEditId] = useState<
    string | null
  >(null);

  /**
   *
   * @returns
   */

  function _getLoadingTrip(): ITripData {
    const loadingTrip: ITripData = createNewEmptyTrip(
      "Trip Loading",
      "init-1",
      "loading-id",
      "Loading Name",
      "loading@loading.com"
    );
    return loadingTrip;
  }

  /**
   *
   */
  async function _populateTripsData() {
    const tripsStorageQueue = new StorageQueue();
    if (user) {
      FirebaseDb.getUserDocData("_populateTripsData() :: 1", user).then(
        async (userDoc) => {
          // get owned and shared trip IDs from user doc
          let userData = userDoc.data();
          if (userData) {
            let ownedTripIds: string[] = userData.ownedTrips;
            let sharedTripIds: string[] = userData.sharedTrips;

            // get trip info for each owned and shared trip ids
            for (let i of ownedTripIds) {
              await FirebaseDb.getTripDoc("_populateTripsData() :: 2", i)
                .then((tripDoc) => {
                  let data = tripDoc.data();
                  if (data) {
                    let newTrip: ITripData = {
                      id: data.id,
                      title: data.title,
                      owned: true,
                      tripSaved: true,
                      ownerId: data.ownerId,
                      ownerName: data.ownerName,
                      ownerEmail: data.ownerEmail,
                      themeId: data.themeId,
                      personList: data.personList,
                      activityList: data.activityList,
                    };
                    tripsStorageQueue.addItem(newTrip);
                  }
                })
                .catch((err) => console.error(err));
            }
            for (let i of sharedTripIds) {
              await FirebaseDb.getTripDoc("_populateTripsData() :: 3", i)
                .then((tripDoc) => {
                  let data = tripDoc.data();
                  if (data) {
                    let newTrip: ITripData = {
                      id: data.id,
                      title: data.title,
                      owned: false,
                      tripSaved: true,
                      ownerId: data.ownerId,
                      ownerName: data.ownerName,
                      ownerEmail: data.ownerEmail,
                      themeId: data.themeId,
                      personList: data.personList,
                      activityList: data.activityList,
                    };
                    tripsStorageQueue.addItem(newTrip);
                  }
                })
                .catch((err) => console.error(err));
            }
            setTrips(tripsStorageQueue.getAllItems().reverse());
          }
        }
      );
    }
  }

  /**
   *
   * @param tripId
   * @returns
   */
  function _checkLocalTripsIfIdOwned(tripId: string): boolean {
    let isOwned = false;
    for (let i of trips) {
      if (i.id === tripId) {
        if (i.owned === true) {
          isOwned = true;
        }
      }
    }
    return isOwned;
  }

  /**
   *
   * @param tripId
   */
  function _checkIfTripIsSaved(tripId: string): boolean {
    let isSaved = false;
    for (let i of trips) {
      if (i.id === tripId) isSaved = true;
    }
    return isSaved;
  }

  /**
   *
   * @param tripElement
   * @returns
   */
  function _filterDeletedTrip(tripElement: string) {
    if (!currentTrip) return true;
    return tripElement !== currentTrip.id;
  }

  /**
   *
   * @param newTrip
   */
  function _replaceCachedTrip(newTrip: ITripData) {
    let tempTrips = trips;
    for (let i of tempTrips) {
      if (i.id === newTrip.id) {
        (i.title = newTrip.title),
          (i.owned = _checkLocalTripsIfIdOwned(newTrip.id)),
          (i.tripSaved = true),
          (i.ownerId = newTrip.ownerId),
          (i.ownerName = newTrip.ownerName),
          (i.ownerEmail = newTrip.ownerEmail),
          (i.themeId = newTrip.themeId),
          (i.personList = newTrip.personList),
          (i.activityList = newTrip.activityList);
      }
    }
    setTrips(tempTrips);
  }

  /**
   * @param action
   * @param person
   * @param activityList
   */
  type _propagate_person_to_activity_type = "ADD" | "MODIFY" | "REMOVE";
  function _propagatePersonToActivity(
    action: _propagate_person_to_activity_type,
    personId: string,
    activityList: ITripActivity[]
  ): ITripActivity[] {
    let currentActivityList: ITripActivity[] = activityList;
    if (action === "ADD") {
      // add as non participating participant to every activity
      for (let act of currentActivityList) {
        let newParticipant: IActivityParticipant = {
          participantId: personId,
          isParticipating: false,
        };
        if (act.participantList) {
          act.participantList.push(newParticipant);
        }
      }
    } else if (action === "MODIFY") {
      // do nothing
    } else if (action === "REMOVE") {
      let emptyActivityList: ITripActivity[] = [];
      // go through each activity
      for (let act of currentActivityList) {
        // -> if payer: remove activity
        if (act.payerId !== personId) {
          let emptyParticipantList: IActivityParticipant[] = [];
          for (let p of act.participantList) {
            if (p.participantId !== personId) emptyParticipantList.push(p);
          }
          act.participantList = emptyParticipantList;
          emptyActivityList.push(act);
        }
      }
      // -> remove as participant for activity
      currentActivityList = emptyActivityList;
    }
    return currentActivityList;
  }

  /**
   *
   */
  function resetAllCurrent() {
    setCurrentTrip(_getLoadingTrip());
  }

  /**
   *
   * @param loginUser
   */
  async function performUserLogin(loginUser: User) {
    setCurrentUser(loginUser);
    FirebaseDb.checkIfUserExists("performUserLogin() :: 1", loginUser).then(
      (exists) => {
        if (!exists) {
          // new users
          let sampleUid1 = uuidv4();
          let sampleUid2 = uuidv4();
          let sampleUid3 = uuidv4();
          const sampleTrips = getSampleTripData(
            sampleUid1,
            sampleUid2,
            sampleUid3,
            loginUser.uid,
            loginUser.displayName || "Someone",
            loginUser.email || "someone@email.com"
          );
          const newUserDoc: IUserDoc = {
            name: loginUser.displayName || "Someone",
            email: loginUser.email || "someone@email.com",
            ownedTrips: [sampleUid1, sampleUid2, sampleUid3],
            sharedTrips: [],
          };

          FirebaseDb.createUserDocData(
            "performUserLogin() :: 2",
            loginUser,
            newUserDoc
          )
            .then(() => {
              setCurrentUser(loginUser);
              FirebaseDb.createTripDoc(
                "performUserLogin() :: 3",
                sampleTrips[0]
              ).catch((err) => console.error(err));
              FirebaseDb.createTripDoc(
                "performUserLogin() :: 4",
                sampleTrips[1]
              ).catch((err) => console.error(err));
              FirebaseDb.createTripDoc(
                "performUserLogin() :: 5",
                sampleTrips[2]
              )
                .then(() => {
                  sampleTrips[0].owned = true;
                  sampleTrips[1].owned = true;
                  sampleTrips[2].owned = true;
                  sampleTrips[0].tripSaved = true;
                  sampleTrips[1].tripSaved = true;
                  sampleTrips[2].tripSaved = true;
                  let newTrips: ITripData[] = [];
                  newTrips.push(sampleTrips[0]);
                  newTrips.push(sampleTrips[1]);
                  newTrips.push(sampleTrips[2]);
                  setTrips(newTrips);
                  nextRouter.push("/home");
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        } else {
          // existing currentUser
          _populateTripsData().catch((err) => console.error(err));
        }
      }
    );
  }

  /**
   *
   */
  function refreshCachedTrips() {
    _populateTripsData().catch((err) => console.error(err));
  }

  /**
   *
   * @param name
   * @param themeId
   */
  async function addNewTrip(name: string, themeId: string) {
    let newTrip = createNewEmptyTrip(
      name,
      themeId,
      currentUser?.uid || "loading new id",
      currentUser?.displayName || "loading name",
      currentUser?.email || "loading email"
    );
    // createTripDoc()
    // create new trip document and upload it
    await FirebaseDb.createTripDoc("addNewTrip() :: 1", newTrip).catch((err) =>
      console.error(err)
    );
    // getUserDoc()
    // get the user documen to modify owned Trips
    currentUser &&
      (await FirebaseDb.getUserDocData("addNewTrip() :: 2", currentUser)
        .then(async (userDoc) => {
          let data = userDoc.data();
          if (data) {
            let userGet: IUserDoc = {
              name: data.name,
              email: data.email,
              ownedTrips: data.ownedTrips,
              sharedTrips: data.sharedTrips,
            };
            userGet.ownedTrips?.push(newTrip.id);

            // updateUserDoc()
            // upload the modified document back
            await FirebaseDb.updateUserDocData(
              "addNewTrip() :: 3",
              currentUser,
              userGet
            )
              .then(async () => {
                // populateTripData()
                // once document is created, fetch the trips
                await _populateTripsData().then(() => {
                  changeCurrentTrip(newTrip.id, true);
                });
                nextRouter.push(`/trip/${newTrip.id}`);
              })
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => console.error(err)));
  }

  /**
   *
   * @param id
   * @param name
   * @param themeId
   */
  async function editTripDetails(
    newTripName: string,
    newTripTheme: string,
    deleteTrip?: boolean
  ) {
    if (currentUser && currentTrip) {
      if (deleteTrip === true) {
        FirebaseDb.getUserDocData("editTripDetails() :: 1", currentUser)
          .then((userDoc) => {
            let data = userDoc.data();
            if (data) {
              if (currentTrip.owned === true) {
                let ownedTrips: string[] = data.ownedTrips;
                // update userDoc
                let newOwnedTrips = ownedTrips.filter(_filterDeletedTrip);
                let newUserDocData: IUserDoc = {
                  name: data.name,
                  email: data.email,
                  ownedTrips: newOwnedTrips,
                  sharedTrips: data.sharedTrips,
                };
                FirebaseDb.updateUserDocData(
                  "editTripDetails() :: 2",
                  currentUser,
                  newUserDocData
                )
                  .then(() => {
                    _populateTripsData();
                    nextRouter.back();
                  })
                  .catch((err) => console.error(err));
              } else {
                let sharedTrips: string[] = data.sharedTrips;
                // update userDoc
                let newSharedTrips = sharedTrips.filter(_filterDeletedTrip);
                let newUserDocData: IUserDoc = {
                  name: data.name,
                  email: data.email,
                  ownedTrips: data.ownedTrips,
                  sharedTrips: newSharedTrips,
                };
                FirebaseDb.updateUserDocData(
                  "editTripDetails() :: 3",
                  currentUser,
                  newUserDocData
                )
                  .then(() => {
                    _populateTripsData();
                    nextRouter.back();
                  })
                  .catch((err) => console.error(err));
              }
            }
          })
          .catch((err) => console.error(err));
      } else {
        // modify databse trip
        FirebaseDb.getTripDoc("editTripDetails() :: 4", currentTrip.id)
          .then((tripDoc) => {
            let data = tripDoc.data();
            if (data) {
              let newTripDoc: ITripData = {
                id: data.id,
                title: newTripName,
                ownerId: data.ownerId,
                ownerName: data.ownerName,
                ownerEmail: data.ownerEmail,
                themeId: newTripTheme,
                personList: currentTrip.personList,
                activityList: currentTrip.activityList,
              };
              // push new details
              FirebaseDb.updateTripDoc("editTripDetails() :: 5", newTripDoc)
                .then(() => {
                  // pull updated trip doc
                  FirebaseDb.getTripDoc(
                    "editTripDetails() :: 6",
                    currentTrip.id
                  )
                    .then((updatedTripDoc) => {
                      let updatedTripDocData = updatedTripDoc.data();
                      if (updatedTripDocData) {
                        let newTripGet: ITripData = {
                          id: updatedTripDocData.id,
                          title: updatedTripDocData.title,
                          owned: true,
                          tripSaved: true,
                          ownerId: updatedTripDocData.ownerId,
                          ownerName: updatedTripDocData.ownerName,
                          ownerEmail: updatedTripDocData.ownerEmail,
                          themeId: updatedTripDocData.themeId,
                          personList: updatedTripDocData.personList,
                          activityList: updatedTripDocData.activityList,
                        };
                        _replaceCachedTrip(newTripGet);
                        setCurrentTrip(newTripGet);
                      }
                    })
                    .catch((err) => console.error(err));
                })
                .catch((err) => console.error(err));
            }
          })
          .catch((err) => console.error(err));
      }
    }
  }

  /**
   *
   * @param tripId
   */
  async function changeCurrentTrip(tripId: string, useLocal: boolean) {
    // try to use local
    if (useLocal === true) {
      for (let i of trips) {
        if (i.id === tripId) setCurrentTrip(i);
      }
    } else if (useLocal === false) {
      // otherwise fetch from database
      FirebaseDb.getTripDoc("changeCurrentTrip() :: 1", tripId)
        .then((tripDoc) => {
          let data = tripDoc.data();
          if (data) {
            let isOwned = _checkLocalTripsIfIdOwned(data.id);
            let isSaved = _checkIfTripIsSaved(data.id);
            let fetchedTrip: ITripData = {
              id: data.id,
              title: data.title,
              owned: isOwned,
              tripSaved: isSaved,
              ownerId: data.ownerId,
              ownerName: data.ownerName,
              ownerEmail: data.ownerEmail,
              themeId: data.themeId,
              personList: data.personList,
              activityList: data.activityList,
            };
            setCurrentTrip(fetchedTrip);
          }
        })
        .catch((err) => console.error(err));
    }
  }

  /**
   *
   * @param tripId
   */
  async function saveSharedTrip(tripId: string) {
    if (currentUser) {
      // get UserDoc
      FirebaseDb.getUserDocData("saveSharedTrip() :: 1", currentUser)
        .then((userDoc) => {
          let data = userDoc.data();
          if (data) {
            let currentSharedTrips: string[] = data.sharedTrips;
            currentSharedTrips.push(tripId);
            let newUserDoc: IUserDoc = {
              name: data.name,
              email: data.email,
              ownedTrips: data.ownedTrips,
              sharedTrips: currentSharedTrips,
            };
            // update UserDoc
            FirebaseDb.updateUserDocData(
              "saveSharedTrip() :: 2",
              currentUser,
              newUserDoc
            )
              .then(() => {
                // changeCurrentTrip
                if (currentTrip) {
                  let currentTripTemp: ITripData = currentTrip;
                  currentTripTemp.tripSaved = true;
                  setCurrentTrip(currentTripTemp);
                  // populate
                  _populateTripsData();
                }
              })
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => console.error(err));
    }
  }

  /**
   * @param personId
   */
  function getPersonById(personId: string): string {
    let tempPerson: string = "loading";
    if (
      currentTrip &&
      currentTrip.personList &&
      currentTrip.personList.length > 0
    ) {
      for (let i of currentTrip.personList) {
        if (i.id === personId) {
          return i.name;
        }
      }
    }
    return tempPerson;
  }

  /**
   *
   * @param personName
   */
  async function addNewPerson(personName: string) {
    if (currentTrip && currentUser) {
      // get trip doc
      FirebaseDb.getTripDoc("addNewPerson() :: 1", currentTrip.id)
        .then((tripDoc) => {
          let dataGet = tripDoc.data();
          if (dataGet) {
            // update trip doc
            let newPersonList: ITripPerson[] = [];
            if (currentTrip.personList) {
              for (let p of currentTrip.personList) newPersonList.push(p);
            }
            let newPerson: ITripPerson = {
              id: uuidv4(),
              name: personName,
            };
            newPersonList.push(newPerson);
            let newActivityList = currentTrip.activityList;
            if (currentTrip.activityList) {
              newActivityList = _propagatePersonToActivity(
                "ADD",
                newPerson.id,
                currentTrip.activityList
              );
            }
            FirebaseDb.updateTripDoc("addNewPerson() :: 2", {
              id: currentTrip.id,
              title: currentTrip.title,
              ownerId: currentTrip.ownerId,
              ownerName: currentTrip.ownerName,
              ownerEmail: currentTrip.ownerEmail,
              themeId: currentTrip.themeId,
              personList: newPersonList,
              activityList: newActivityList,
            })
              .then(() => {
                // pull from database currentTrip
                FirebaseDb.getTripDoc(
                  "addNewPerson() :: 3",
                  currentTrip.id
                ).then((updatedTripDoc) => {
                  let updatedTripDocData = updatedTripDoc.data();
                  if (updatedTripDocData) {
                    // find and update cached trip
                    let newTripGet: ITripData = {
                      id: updatedTripDocData.id,
                      title: updatedTripDocData.title,
                      owned: true,
                      tripSaved: true,
                      ownerId: updatedTripDocData.ownerId,
                      ownerName: updatedTripDocData.ownerName,
                      ownerEmail: updatedTripDocData.ownerEmail,
                      themeId: updatedTripDocData.themeId,
                      personList: updatedTripDocData.personList,
                      activityList: updatedTripDocData.activityList,
                    };
                    _replaceCachedTrip(newTripGet);
                    setCurrentTrip(newTripGet);
                  }
                });
              })
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => console.error(err));
    }
  }

  /**
   *
   * @param param0
   * @param editPersonInput
   */
  async function editPerson(
    { action }: IEditModalActions,
    editPersonInputId: string,
    newName?: string
  ) {
    if (action === "OPEN") {
      setcurrentPersonEditId(editPersonInputId);
    } else if (action === "CLOSE") {
      setcurrentPersonEditId(null);
    } else if (action === "SAVE") {
      if (currentTrip && currentPersonEditId && newName) {
        // get Trip doc
        FirebaseDb.getTripDoc("editPerson() :: 1", currentTrip.id)
          .then((tripDoc) => {
            let tripDocData = tripDoc.data();
            if (tripDocData) {
              // update people
              let pulledTrip: ITripData = {
                id: tripDocData.id,
                title: tripDocData.title,
                ownerId: tripDocData.ownerId,
                ownerEmail: tripDocData.ownerEmail,
                ownerName: tripDocData.ownerName,
                themeId: tripDocData.themeId,
                personList: tripDocData.personList,
                activityList: tripDocData.activityList,
              };
              // update person
              // go through and change name by id
              if (pulledTrip.personList) {
                for (let i of pulledTrip.personList) {
                  if (i.id === currentPersonEditId) {
                    i.name = newName;
                  }
                }
              }
              // update activities
              if (pulledTrip.activityList) {
                pulledTrip.activityList = _propagatePersonToActivity(
                  "MODIFY",
                  currentPersonEditId,
                  pulledTrip.activityList
                );
              }
              // push updated trip doc
              FirebaseDb.updateTripDoc("editPerson() :: 2", pulledTrip)
                .then(() => {
                  // pul updated trip doc
                  FirebaseDb.getTripDoc("editPerson() :: 3", currentTrip.id)
                    .then((updatedTripDoc) => {
                      let updatedTripDocData = updatedTripDoc.data();
                      if (updatedTripDocData) {
                        // replaced cached trip
                        let newTripGet: ITripData = {
                          id: updatedTripDocData.id,
                          title: updatedTripDocData.title,
                          owned: true,
                          tripSaved: true,
                          ownerId: updatedTripDocData.ownerId,
                          ownerName: updatedTripDocData.ownerName,
                          ownerEmail: updatedTripDocData.ownerEmail,
                          themeId: updatedTripDocData.themeId,
                          personList: updatedTripDocData.personList,
                          activityList: updatedTripDocData.activityList,
                        };
                        _replaceCachedTrip(newTripGet);
                        setCurrentTrip(newTripGet);
                      }
                    })
                    .catch((err) => console.error(err));
                })
                .catch((err) => console.error(err));
            }
          })
          .catch((err) => console.error(err));
        setcurrentPersonEditId(null);
      }
    } else if (action === "DELETE") {
      if (currentTrip && currentPersonEditId) {
        // get Trip doc
        FirebaseDb.getTripDoc("editPerson() :: 1", currentTrip.id)
          .then((tripDoc) => {
            let tripDocData = tripDoc.data();
            if (tripDocData) {
              // update people
              let pulledTrip: ITripData = {
                id: tripDocData.id,
                title: tripDocData.title,
                ownerId: tripDocData.ownerId,
                ownerEmail: tripDocData.ownerEmail,
                ownerName: tripDocData.ownerName,
                themeId: tripDocData.themeId,
                personList: tripDocData.personList,
                activityList: tripDocData.activityList,
              };
              let tempPersonList = [];
              if (pulledTrip.personList) {
                for (let i of pulledTrip.personList) {
                  if (i.id !== currentPersonEditId) tempPersonList.push(i);
                }
              }
              pulledTrip.personList = tempPersonList;
              // update activities
              if (pulledTrip.activityList) {
                pulledTrip.activityList = _propagatePersonToActivity(
                  "REMOVE",
                  currentPersonEditId,
                  pulledTrip.activityList
                );
              }
              // push updated trip doc
              FirebaseDb.updateTripDoc("editPerson() :: 2", pulledTrip)
                .then(() => {
                  // pul updated trip doc
                  FirebaseDb.getTripDoc("editPerson() :: 3", currentTrip.id)
                    .then((updatedTripDoc) => {
                      let updatedTripDocData = updatedTripDoc.data();
                      if (updatedTripDocData) {
                        // replaced cached trip
                        let newTripGet: ITripData = {
                          id: updatedTripDocData.id,
                          title: updatedTripDocData.title,
                          owned: true,
                          tripSaved: true,
                          ownerId: updatedTripDocData.ownerId,
                          ownerName: updatedTripDocData.ownerName,
                          ownerEmail: updatedTripDocData.ownerEmail,
                          themeId: updatedTripDocData.themeId,
                          personList: updatedTripDocData.personList,
                          activityList: updatedTripDocData.activityList,
                        };
                        _replaceCachedTrip(newTripGet);
                        setCurrentTrip(newTripGet);
                      }
                    })
                    .catch((err) => console.error(err));
                })
                .catch((err) => console.error(err));
            }
          })
          .catch((err) => console.error(err));
        setcurrentPersonEditId(null);
      }
    }
  }

  /**
   *
   * @param param0
   * @returns
   */
  async function addActivity({
    title,
    cost,
    payerId,
    participantList,
  }: Omit<ITripActivity, "id">) {
    if (!currentTrip || !currentUser) return;

    // Step 1: Get Trip Doc
    FirebaseDb.getTripDoc("addActivity() :: 1", currentTrip.id)
      .then((tripDoc) => {
        let data = tripDoc.data();
        if (!data) return;
        // Step 2: modify data
        let newActivityList = [];
        if (currentTrip.activityList) {
          for (let a of currentTrip.activityList) newActivityList.push(a);
        }
        let newActivity: ITripActivity = {
          id: uuidv4(),
          title: title,
          cost: cost,
          payerId: payerId,
          participantList: participantList,
        };
        newActivityList.push(newActivity);
        // Step 3 : upload data
        FirebaseDb.updateTripDoc("addActivity() :: 2", {
          id: currentTrip.id,
          title: currentTrip.title,
          ownerId: currentTrip.ownerId,
          ownerName: currentTrip.ownerName,
          ownerEmail: currentTrip.ownerEmail,
          themeId: currentTrip.themeId,
          personList: currentTrip.personList,
          activityList: newActivityList,
        })
          .then(() => {
            // Step 4: pull from database
            FirebaseDb.getTripDoc("addActivity() :: 3", currentTrip.id)
              .then((updatedTripDoc) => {
                let dataUpdated = updatedTripDoc.data();
                if (!dataUpdated) return;
                let newTripGet: ITripData = {
                  id: dataUpdated.id,
                  title: dataUpdated.title,
                  owned: true,
                  tripSaved: true,
                  ownerId: dataUpdated.ownerId,
                  ownerName: dataUpdated.ownerName,
                  ownerEmail: dataUpdated.ownerEmail,
                  themeId: dataUpdated.themeId,
                  personList: dataUpdated.personList,
                  activityList: dataUpdated.activityList,
                };
                _replaceCachedTrip(newTripGet);
                setCurrentTrip(newTripGet);
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  /**
   *
   * @param param0
   * @param newTitle
   * @param newCost
   * @param newPayerId
   * @param newParticipantList
   */
  async function editActivity(
    { action }: IEditModalActions,
    editActivityId: string,
    newTitle?: string,
    newCost?: number,
    newPayerId?: string,
    newParticipantList?: IActivityParticipant[]
  ) {
    if (action === "OPEN") setcurrentActivityEditId(editActivityId);
    else if (action === "CLOSE") setcurrentActivityEditId(null);
    else if (action === "SAVE") {
      if (
        !currentTrip ||
        !currentActivityEditId ||
        !newTitle ||
        !newCost ||
        !newPayerId ||
        !newParticipantList
      )
        return;
      // get trip doc
      FirebaseDb.getTripDoc("editActivity() :: 1", currentTrip.id)
        .then((tripDoc) => {
          let data = tripDoc.data();
          if (!data) return;
          let pulledTrip: ITripData = {
            id: data.id,
            title: data.title,
            ownerId: data.ownerId,
            ownerEmail: data.ownerEmail,
            ownerName: data.ownerName,
            themeId: data.themeId,
            personList: data.personList,
            activityList: data.activityList,
          };
          // modify data
          if (pulledTrip.activityList) {
            for (let i of pulledTrip.activityList) {
              if (i.id === currentActivityEditId) {
                (i.title = newTitle),
                  (i.cost = newCost),
                  (i.payerId = newPayerId),
                  (i.participantList = newParticipantList);
              }
            }
          }
          // push to database
          FirebaseDb.updateTripDoc("editActivity() :: 2", pulledTrip)
            .then(() => {
              // pull updated trip doc
              FirebaseDb.getTripDoc("editActivity() :: 3", currentTrip.id)
                .then((updatedTripDoc) => {
                  let dataUpdated = updatedTripDoc.data();
                  if (!dataUpdated) return;
                  // replace chached trip
                  let newTripGet: ITripData = {
                    id: dataUpdated.id,
                    title: dataUpdated.title,
                    owned: true,
                    tripSaved: true,
                    ownerId: dataUpdated.ownerId,
                    ownerName: dataUpdated.ownerName,
                    ownerEmail: dataUpdated.ownerEmail,
                    themeId: dataUpdated.themeId,
                    personList: dataUpdated.personList,
                    activityList: dataUpdated.activityList,
                  };
                  _replaceCachedTrip(newTripGet);
                  setCurrentTrip(newTripGet);
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
      setcurrentActivityEditId(null);
    } else if (action === "DELETE") {
      if (!currentTrip || !currentActivityEditId) return;
      // get TripDoc
      FirebaseDb.getTripDoc("editActivity() :: 4", currentTrip.id)
        .then((tripDoc) => {
          let data = tripDoc.data();
          if (!data) return;
          // update activity list
          let pulledTrip: ITripData = {
            id: data.id,
            title: data.title,
            ownerId: data.ownerId,
            ownerEmail: data.ownerEmail,
            ownerName: data.ownerName,
            themeId: data.themeId,
            personList: data.personList,
            activityList: data.activityList,
          };
          let tempActivityList: ITripActivity[] = [];
          if (pulledTrip.activityList) {
            for (let i of pulledTrip.activityList) {
              if (i.id !== currentActivityEditId) tempActivityList.push(i);
            }
          }
          pulledTrip.activityList = tempActivityList;
          // push updated trip doc
          FirebaseDb.updateTripDoc("editActivity() :: 5", pulledTrip)
            .then(() => {
              // pull updated trip doc
              FirebaseDb.getTripDoc("editActivity :: 6", currentTrip.id)
                .then((updatedTripDoc) => {
                  let dataUpdated = updatedTripDoc.data();
                  if (!dataUpdated) return;
                  // replace cached trips
                  let newTripGet: ITripData = {
                    id: dataUpdated.id,
                    title: dataUpdated.title,
                    owned: true,
                    tripSaved: true,
                    ownerId: dataUpdated.ownerId,
                    ownerName: dataUpdated.ownerName,
                    ownerEmail: dataUpdated.ownerEmail,
                    themeId: dataUpdated.themeId,
                    personList: dataUpdated.personList,
                    activityList: dataUpdated.activityList,
                  };
                  _replaceCachedTrip(newTripGet);
                  setCurrentTrip(newTripGet);
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
      setcurrentActivityEditId(null);
    }
  }

  /**
   *
   */
  function getActivityById(id: string): ITripActivity | null {
    let final = null;
    if (!currentActivityEditId || !currentTrip || !currentTrip.activityList)
      return final;
    for (let a of currentTrip.activityList) {
      if (a.id === id) final = a;
    }
    return final;
  }
  /**
   *
   */
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      _populateTripsData();
    }
  }, [user]);

  const providerValue = {
    currentUser,
    trips,
    currentTrip,
    currentPersonEditId,
    currentActivityEditId,
    resetAllCurrent,
    performUserLogin,
    refreshCachedTrips,
    addNewTrip,
    editTripDetails,
    changeCurrentTrip,
    saveSharedTrip,
    getPersonById,
    addNewPerson,
    editPerson,
    addActivity,
    editActivity,
    getActivityById,
  };
  return (
    <TripDataContext.Provider value={providerValue}>
      {children}
    </TripDataContext.Provider>
  );
};

export default TripDataContextProvider;
