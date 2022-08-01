/** @format */

import { useContext } from "react";

import { TripDataContext } from "../context/TripDataContext";
import { FirebaseAuth } from "../lib/firebase/auth";

import ProtectedPage from "../components/layout/ProtectedPage";
import PageWrapper from "../components/layout/PageWrapper";
import TripTile from "../components/home/TripTile";
import Header from "../components/home/Header";
import MainContent from "../components/layout/MainContent";
import SubHeading from "../components/core/SubHeading";
import TripsList from "../components/home/TripsList";

const Home = () => {
  const current = useContext(TripDataContext).currentUser;
  const trips = useContext(TripDataContext).trips;

  return (
    <ProtectedPage>
      <PageWrapper>
        <Header />
        <MainContent>
          <SubHeading text="My trips" />
          <TripsList tripsType="owned" />
          <SubHeading text="Trips shared with me" />
          <TripsList tripsType="shared" />
        </MainContent>
      </PageWrapper>
    </ProtectedPage>
  );
};

export default Home;
