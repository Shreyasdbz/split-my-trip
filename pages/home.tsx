/** @format */

import { useContext, useState } from "react";

import { TripDataContext } from "../context/TripDataContext";

import ProtectedPage from "../components/layout/ProtectedPage";
import PageWrapper from "../components/layout/PageWrapper";
import Header from "../components/home/Header";
import MainContent from "../components/layout/MainContent";
import SubHeading from "../components/core/SubHeading";
import TripsList from "../components/home/TripsList";
import UserSettingsModal from "../components/home/UserSettingsModal";
import AddTripFloatingBtn from "../components/home/AddTripFloatingBtn";

const Home = () => {
  const current = useContext(TripDataContext).currentUser;
  const trips = useContext(TripDataContext).trips;

  const [userModalActive, setUserModalActive] = useState<boolean>(false);
  const [newTripModalActive, setNewTripModalActive] = useState<boolean>(false);

  return (
    <ProtectedPage>
      <UserSettingsModal />

      <PageWrapper>
        <Header />

        <AddTripFloatingBtn />

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
