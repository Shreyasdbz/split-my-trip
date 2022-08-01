/** @format */

import { User } from 'firebase/auth';
import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';

import { FirebaseConfig } from '../lib/firebase/config';
import { FirebaseDb } from '../lib/firebase/db';
import { StorageQueue } from '../lib/StorageQueue';

import { getSampleTripData } from '../models/sampleTrips';

interface ITripDataContext {
  currentUser: User | null;
  trips: ITripData[];
  performUserLogin: (loginUser: User) => void;
}

export const TripDataContext = createContext({} as ITripDataContext);

interface ITripDataContextProvider {
  children: React.ReactElement | React.ReactElement[];
}
const TripDataContextProvider = ({ children }: ITripDataContextProvider) => {
  const [user] = useAuthState(FirebaseConfig.auth);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<ITripData[]>([]);

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
          setTrips(tripsStorageQueue.getAllItems());
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
          loginUser.displayName || '',
          loginUser.email || ''
        );
        const newUserDoc: IUserDoc = {
          name: loginUser.displayName || '',
          email: loginUser.email || '',
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
    performUserLogin,
  };
  return (
    <TripDataContext.Provider value={providerValue}>
      {children}
    </TripDataContext.Provider>
  );
};

export default TripDataContextProvider;
