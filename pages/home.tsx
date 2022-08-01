/** @format */

import { useSession, signOut } from 'next-auth/react';

import ProtectedPage from '../components/layout/ProtectedPage';

const Home = () => {
  return (
    <ProtectedPage>
      <div>Home Page</div>
      <button onClick={() => signOut()}>Sign Out</button>
    </ProtectedPage>
  );
};

export default Home;
