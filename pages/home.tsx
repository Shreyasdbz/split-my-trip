/** @format */

import { useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { TripDataContext } from '../context/TripDataContext';
import { FirebaseConfig } from '../lib/firebase/config';
import { FirebaseAuth } from '../lib/firebase/auth';

import ProtectedPage from '../components/layout/ProtectedPage';

const Home = () => {
  const current = useContext(TripDataContext).currentUser;
  const trips = useContext(TripDataContext).trips;

  return (
    <ProtectedPage>
      <div>Home Page</div>
      <div>
        <span>{current?.email}</span>
      </div>
      <div>
        <h1 className='font-bold'>MY Trips</h1>
        {trips?.map((trip) => {
          if (trip.owned) {
            return (
              <div key={trip.id}>
                <div>{trip.title}</div>
              </div>
            );
          }
        })}
      </div>
      <div>
        <h1 className='font-bold'>Shared Trips</h1>
        {trips?.map((trip) => {
          if (!trip.owned) {
            return (
              <div key={trip.id}>
                <div>{trip.title}</div>
              </div>
            );
          }
        })}
      </div>
      <button onClick={() => FirebaseAuth.useSignOut()}>Sign Out</button>
    </ProtectedPage>
  );
};

export default Home;
