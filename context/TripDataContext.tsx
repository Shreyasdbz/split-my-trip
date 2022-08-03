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
  currentTrip: ITripData;
  performUserLogin: (loginUser: User) => void;
  addNewTrip: (name: string, themeId: string) => Promise<void>;
  editTripDetails: (deleteTrip?: boolean) => Promise<boolean>;
  retrieveTripData: (id: string) => void;
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
  const [currentTrip, setCurrentTrip] = useState<ITripData>(_getLoadingTrip());

  /**
   *
   * @returns
   */
  function _getLoadingTrip(): ITripData {
    let loadingTrip: ITripData = createNewEmptyTrip(
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
      FirebaseDb.getUserDocData(user).then(async (userDoc) => {
        // get owned and shared trip IDs from user doc
        let userData = userDoc.data();
        if (userData) {
          let ownedTripIds: string[] = userData.ownedTrips;
          let sharedTripIds: string[] = userData.sharedTrips;

          // get trip info for each owned and shared trip ids
          for (let i of ownedTripIds) {
            await FirebaseDb.getTripDoc(i)
              .then((tripDoc) => {
                let data = tripDoc.data();
                if (data) {
                  let newTrip = {
                    id: data.id,
                    title: data.title,
                    owned: true,
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
            await FirebaseDb.getTripDoc(i)
              .then((tripDoc) => {
                let data = tripDoc.data();
                if (data) {
                  let newTrip = {
                    id: data.id,
                    title: data.title,
                    owned: false,
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
      });
    }
  }

  /**
   *
   * @param loginUser
   */
  async function performUserLogin(loginUser: User) {
    setCurrentUser(loginUser);
    FirebaseDb.checkIfUserExists(loginUser).then((exists) => {
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

        FirebaseDb.createUserDocData(loginUser, newUserDoc)
          .then(() => {
            setCurrentUser(loginUser);
            FirebaseDb.createTripDoc(sampleTrips[0]).catch((err) =>
              console.error(err)
            );
            FirebaseDb.createTripDoc(sampleTrips[1])
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
    });
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
    await FirebaseDb.createTripDoc(newTrip).catch((err) => console.error(err));
    // getUserDoc()
    // get the user documen to modify owned Trips
    currentUser &&
      (await FirebaseDb.getUserDocData(currentUser)
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
            await FirebaseDb.updateUserDocData(currentUser, userGet)
              .then(async () => {
                // populateTripData()
                // once document is created, fetch the trips
                await _populateTripsData().then(() => {
                  retrieveTripData(newTrip.id);
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
  async function editTripDetails(deleteTrip?: boolean) {
    // get user doc
    // edit user doc
    // _populate data
    // route back
    return true;
  }

  /**
   *
   * @param tripId
   */
  async function retrieveTripData(tripId: string) {
    // try to use local
    for (let i of trips) {
      if (i.id === tripId) setCurrentTrip(i);
    }
    // otherwise fetch from database
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
    performUserLogin,
    addNewTrip,
    editTripDetails,
    retrieveTripData,
  };
  return (
    <TripDataContext.Provider value={providerValue}>
      {children}
    </TripDataContext.Provider>
  );
};

export default TripDataContextProvider;
