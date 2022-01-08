/** @format */

import { firebase_auth } from "../config/firebase";

import HeaderHome from "../components/home/HeaderHome";
import TripsList from "../components/home/TripsList";

const Home = () => {
  return (
    <div className="page">
      <HeaderHome />
      <TripsList />
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
