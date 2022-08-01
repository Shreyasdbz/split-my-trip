/** @format */

import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';

import { FirebaseLib } from '../lib';

import Home from './home';

const Landing: NextPage = () => {
  const nextRouter = useRouter();
  const { data: session, status } = useSession();

  if (session) {
    return <Home />;
  } else {
    return (
      <div>
        <h1>Welcome to Split My Trip!</h1>
        <button
          onClick={() => {
            nextRouter.push('/api/auth/signin');
          }}
        >
          Sign On
        </button>
      </div>
    );
  }
};

export default Landing;
