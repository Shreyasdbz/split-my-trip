/** @format */

import { firebase_auth } from "../config/firebase";

const Home = () => {
  return (
    <div className="page">
      <h1>Home!!!</h1>
      <button
        onClick={() => {
          firebase_auth.signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Home;
