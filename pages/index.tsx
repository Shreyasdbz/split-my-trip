/** @format */

import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

import { FirebaseConfig } from '../lib/firebase/config';

import Loading from './loading';
import Error from './error';

const Landing: NextPage = () => {
  const nextRouter = useRouter();
  const [user, loading, error] = useAuthState(FirebaseConfig.auth);

  useEffect(() => {
    if (!user) {
      nextRouter.push('/signin');
    } else {
      nextRouter.push('/home');
    }
  }, []);

  if (loading) return <Loading />;
  else if (error) return <Error error />;

  return <></>;
};

export default Landing;
