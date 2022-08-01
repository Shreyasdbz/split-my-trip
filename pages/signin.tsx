/** @format */
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import { FirebaseConfig } from '../lib/firebase/config';
import { FirebaseAuth } from '../lib/firebase/auth';

import { TripDataContext } from '../context/TripDataContext';

import Loading from './loading';
import Error from './error';

const SignIn = () => {
  const nextRouter = useRouter();
  const performUserLogin = useContext(TripDataContext).performUserLogin;
  const [user, loading, error] = useAuthState(FirebaseConfig.auth);

  useEffect(() => {
    if (user) {
      nextRouter.push('/home');
    }
  }, []);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error error />;
  }

  return (
    <div>
      <div>test</div>
      <button
        onClick={() => {
          FirebaseAuth.useGoogleSignIn().then((user) => {
            user && performUserLogin(user);
            nextRouter.push('/home');
          });
        }}
      >
        Google
      </button>
    </div>
  );
};

export default SignIn;
