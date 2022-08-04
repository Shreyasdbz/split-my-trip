/** @format */

import { useContext, useEffect } from "react";

import { TripDataContext } from "../context/TripDataContext";

import ProtectedPage from "../components/layout/ProtectedPage";
import PageWrapper from "../components/layout/PageWrapper";
import Header from "../components/home/Header";
import MainContent from "../components/layout/MainContent";
import SubHeading from "../components/core/SubHeading";
import TripsList from "../components/home/TripsList";
import UserSettingsModal from "../components/home/UserSettingsModal";
import AddTripFloatingBtn from "../components/home/AddTripFloatingBtn";
import NewTripModal from "../components/home/NewTripModal";

const Home = () => {
  const resetAllCurrentFunction = useContext(TripDataContext).resetAllCurrent;

  useEffect(() => {
    resetAllCurrentFunction();
  }, []);

  return (
    <ProtectedPage>
      {/* Modals */}
      <UserSettingsModal />
      <NewTripModal />

      <PageWrapper>
        <Header />

        <AddTripFloatingBtn />

        <MainContent>
          <SubHeading text="My Trips" />
          <TripsList tripsType="owned" />

          <SubHeading text="Trips Shared With Me" />
          <TripsList tripsType="shared" />

          <div className="w-full h-12 my-24"></div>
        </MainContent>
      </PageWrapper>
    </ProtectedPage>
  );
};

export default Home;
