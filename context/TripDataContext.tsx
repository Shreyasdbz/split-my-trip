/** @format */

import { User } from 'firebase/auth';
import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';

import { FirebaseConfig } from '../lib/firebase/config';
import { FirebaseDb } from '../lib/firebase/db';

import { getSampleTripData } from '../models/sampleTrips';

interface ITripDataContext {
  currentUser: User | null;
  ownedTrips: ITripData[] | null;
  sharedTrips: ITripData[] | null;
  performUserLogin: (loginUser: User) => void;
}

export const TripDataContext = createContext({} as ITripDataContext);

interface ITripDataContextProvider {
  children: React.ReactElement | React.ReactElement[];
}
const TripDataContextProvider = ({ children }: ITripDataContextProvider) => {
  const [user] = useAuthState(FirebaseConfig.auth);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [ownedTrips, setOwnedTrips] = useState<ITripData[] | null>(null);
  const [sharedTrips, setSharedTrips] = useState<ITripData[] | null>(null);

  async function _populateTripsData() {
    if (currentUser) {
      FirebaseDb.getUserDocData(currentUser).then((userDoc) => {
        let userData = userDoc.data();
        if (userData) {
          let ownedTripsIds: string[] = userData.ownedTrips;
          let sharedTripsIds: string[] = userData.sharedTrips;

          if (ownedTripsIds.length > 0) {
            let ownedTripsList: ITripData[] = [];
            for (let o in ownedTripsIds) {
              FirebaseDb.getTripDoc(o).then((tripDoc) => {
                let tripData = tripDoc.data();
                if (tripData) {
                  let newTrip: ITripData = {
                    id: tripData.id,
                    title: tripData.title,
                    owned: true,
                    ownerName: tripData.ownerName,
                    ownerEmail: tripData.ownerEmail,
                    themeId: tripData.themeId,
                    personList: tripData.personList,
                    activityList: tripData.activityList,
                  };
                  ownedTripsList.push(newTrip);
                }
              });
            }
            console.log('in populate owned - ', ownedTrips);
            setOwnedTrips(ownedTripsList);
          }
          if (sharedTripsIds.length > 0) {
            let sharedTripsList: ITripData[] = [];
            for (let s in sharedTripsIds) {
              FirebaseDb.getTripDoc(s).then((tripDoc) => {
                let tripData = tripDoc.data();
                if (tripData) {
                  let newTrip: ITripData = {
                    id: tripData.id,
                    title: tripData.title,
                    owned: true,
                    ownerName: tripData.ownerName,
                    ownerEmail: tripData.ownerEmail,
                    themeId: tripData.themeId,
                    personList: tripData.personList,
                    activityList: tripData.activityList,
                  };
                  sharedTripsList.push(newTrip);
                }
              });
            }
            setSharedTrips(sharedTripsList);
          }
        }
      });
    }
  }

  async function performUserLogin(loginUser: User) {
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
                let currentOwnedTrips: ITripData[] = [];
                currentOwnedTrips.push(sampleTrips[0]);
                currentOwnedTrips.push(sampleTrips[1]);
                setOwnedTrips(currentOwnedTrips);
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      } else {
        // existing currentUser
        setCurrentUser(loginUser);
        _populateTripsData().catch((err) => console.error(err));
      }
    });
  }

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      _populateTripsData()
        .then(() => {
          console.log('currentUser', currentUser);
          console.log('ownedTrips', ownedTrips);
          console.log('sharedTrip', sharedTrips);
        })
        .catch((err) => {
          console.error('On load populate error: ', err);
        });
    }
  }, [user]);

  const providerValue = {
    currentUser,
    ownedTrips,
    sharedTrips,
    performUserLogin,
  };
  return (
    <TripDataContext.Provider value={providerValue}>
      {children}
    </TripDataContext.Provider>
  );
};

export default TripDataContextProvider;
