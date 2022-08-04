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
  currentPersonEdit: ITripPerson | null;
  currentActivityEdit: ITripActivity | null;
  resetAllCurrent: () => void;
  performUserLogin: (loginUser: User) => void;
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
    editPersonInput: ITripPerson
  ) => Promise<void>;
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
  const [currentPersonEdit, setcurrentPersonEdit] =
    useState<ITripPerson | null>(null);
  const [currentActivityEdit, setcurrentActivityEdit] =
    useState<ITripActivity | null>(null);

  /**
   *
   * @returns
   */

  function _getLoadingTrip(): ITripData {
    const loadingTrip: ITripData = createNewEmptyTrip(
      "Trip Loading",
      "init-1",
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
          (i.tripSaved = _checkIfTripIsSaved(newTrip.id)),
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
          const sampleTrips = getSampleTripData(
            sampleUid1,
            sampleUid2,
            loginUser.displayName || "",
            loginUser.email || ""
          );
          const newUserDoc: IUserDoc = {
            name: loginUser.displayName || "",
            email: loginUser.email || "",
            ownedTrips: [sampleUid1, sampleUid2],
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
              )
                .then(() => {
                  let newTrips: ITripData[] = [];
                  newTrips.push(sampleTrips[0]);
                  newTrips.push(sampleTrips[1]);
                  setTrips(newTrips);
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
   * @param name
   * @param themeId
   */
  async function addNewTrip(name: string, themeId: string) {
    let newTrip = createNewEmptyTrip(
      name,
      themeId,
      currentUser?.displayName || "",
      currentUser?.email || ""
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
                // TODO: delete Trip Doc
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
                // TODO: delete Trip Doc
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
            newPersonList.push({
              id: uuidv4(),
              name: personName,
            });
            FirebaseDb.updateTripDoc("addNewPerson() :: 2", {
              id: currentTrip.id,
              title: currentTrip.title,
              ownerName: currentTrip.ownerName,
              ownerEmail: currentTrip.ownerEmail,
              themeId: currentTrip.themeId,
              personList: newPersonList,
              activityList: currentTrip.activityList,
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
    editPersonInput: ITripPerson
  ) {
    if (action === "OPEN") {
      setcurrentPersonEdit(editPersonInput);
    } else if (action === "CLOSE") {
      setcurrentPersonEdit(null);
    } else if (action === "SAVE") {
      setcurrentPersonEdit(null);
    } else if (action === "DELETE") {
      setcurrentPersonEdit(null);
    }
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
    currentPersonEdit,
    currentActivityEdit,
    resetAllCurrent,
    performUserLogin,
    addNewTrip,
    editTripDetails,
    changeCurrentTrip,
    saveSharedTrip,
    getPersonById,
    addNewPerson,
    editPerson,
  };
  return (
    <TripDataContext.Provider value={providerValue}>
      {children}
    </TripDataContext.Provider>
  );
};

export default TripDataContextProvider;
