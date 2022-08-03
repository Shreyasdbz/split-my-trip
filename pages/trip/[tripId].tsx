/** @format */
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { TripDataContext } from "../../context/TripDataContext";

import ProtectedPage from "../../components/layout/ProtectedPage";
import MainContent from "../../components/layout/MainContent";
import Header from "../../components/trip/Header";
import EditTripBtn from "../../components/trip/EditTripBtn";
import EditTripModal from "../../components/trip/EditTripModal";
import PageWrapper from "../../components/layout/PageWrapper";
import GetSplitFloatingBtn from "../../components/trip/GetSplitFloatingBtn";
import SectionTitle from "../../components/core/SectionTitle";
import PersonListView from "../../components/trip/PersonListView";

const Trip = () => {
  const router = useRouter();
  const currentTrip = useContext(TripDataContext).currentTrip;
  const retrieveTripData = useContext(TripDataContext).retrieveTripData;
  const { tripId } = router.query;

  useEffect(() => {
    if (typeof tripId === "string") retrieveTripData(tripId);
  });

  if (!currentTrip) {
    return <></>;
  }

  return (
    <ProtectedPage>
      {/* Modals */}
      <EditTripModal />

      <PageWrapper>
        <Header text={currentTrip.title} themeId={currentTrip.themeId} />

        <GetSplitFloatingBtn />

        <MainContent>
          <EditTripBtn />

          {/* People Section */}
          <SectionTitle
            text={"People"}
            buttonText={"ADD +"}
            onClickAction={() => {}}
          />
          <PersonListView />

          {/* Activities Section */}
          <SectionTitle
            text={"Activities"}
            buttonText={"ADD +"}
            onClickAction={() => {}}
          />
        </MainContent>
      </PageWrapper>
    </ProtectedPage>
  );
};

export default Trip;
