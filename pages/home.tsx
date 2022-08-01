/** @format */

import { useContext } from 'react';

import { TripDataContext } from '../context/TripDataContext';
import { FirebaseAuth } from '../lib/firebase/auth';

import ProtectedPage from '../components/layout/ProtectedPage';

const Home = () => {
  const currentUser = useContext(TripDataContext).currentUser;
  const ownedTrips = useContext(TripDataContext).ownedTrips;
  return (
    <ProtectedPage>
      <div>Home Page</div>
      <div>
        <span>{currentUser?.email}</span>
      </div>
      <div>
        {ownedTrips?.map((trip) => {
          return (
            <div key={trip.id}>
              <div>{trip.title}</div>
            </div>
          );
        })}
      </div>
      <button onClick={() => FirebaseAuth.useSignOut()}>Sign Out</button>
    </ProtectedPage>
  );
};

export default Home;
