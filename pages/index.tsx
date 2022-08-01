/** @format */

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';

import { FirebaseLib } from '../lib';

import SignOn from './signOn';
import Home from './home';
import Error from './error';
import Loading from './loading';

const Landing: NextPage = () => {
  const nextRouter = useRouter();
  const { data: session, status } = useSession();

  if (session) {
    return <Home />;
  } else {
    return <SignOn />;
  }
};

export default Landing;
