/** @format */

import Header from "../components/home/Header";
import TripsList from "../components/home/TripsList";
import AddTripButton from "../components/home/AddTripButton";
import InfoTab from "../components/common/InfoTab";

const Home = () => {
  return (
    <div className="page home-page">
      <Header />
      <div className="page-container">
        <TripsList />
      </div>
      <InfoTab />
      <AddTripButton />
    </div>
  );
};

export default Home;
