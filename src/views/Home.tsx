/** @format */

import Header from "../components/home/Header";
import TripsList from "../components/home/TripsList";
import AddTripButton from "../components/home/AddTripButton";

const Home = () => {
  return (
    <div className="page home-page">
      <Header />
      <div className="page-container">
        <TripsList />
      </div>
      <AddTripButton />
    </div>
  );
};

export default Home;
