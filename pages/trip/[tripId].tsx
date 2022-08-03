/** @format */
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { TripDataContext } from "../../context/TripDataContext";
import { UiContext } from "../../context/UiContext";

import ProtectedPage from "../../components/layout/ProtectedPage";
import MainContent from "../../components/layout/MainContent";
import Header from "../../components/trip/Header";
import EditTripBtn from "../../components/trip/EditTripBtn";
import EditTripModal from "../../components/trip/EditTripModal";
import PageWrapper from "../../components/layout/PageWrapper";
import GetSplitFloatingBtn from "../../components/trip/GetSplitFloatingBtn";
import SectionTitle from "../../components/core/SectionTitle";
import PersonListView from "../../components/trip/PersonListView";
import AddPersonModal from "../../components/trip/AddPersonModal";
import AddActivityModal from "../../components/trip/AddActivityModal";
import ActivityListView from "../../components/trip/ActivityListView";

const Trip = () => {
  const nextRouter = useRouter();
  const { tripId } = nextRouter.query;

  const currentUser = useContext(TripDataContext).currentUser;
  const currentTrip = useContext(TripDataContext).currentTrip;
  const retrieveTripData = useContext(TripDataContext).retrieveTripData;

  const addPersonUiHandler = useContext(UiContext).handleAddPerson;
  const editPersonUiHandler = useContext(UiContext).handleEditPerson;
  const addActivityUiHandler = useContext(UiContext).handleAddActivity;
  const editActivityUiHandler = useContext(UiContext).handleEditActivity;

  useEffect(() => {
    if (typeof tripId === "string") retrieveTripData(tripId, true);
  });

  if (!currentTrip) {
    return <></>;
  }

  return (
    <ProtectedPage>
      {/* Modals */}
      <EditTripModal />
      <AddPersonModal />
      <AddActivityModal />

      <PageWrapper>
        <Header text={currentTrip.title} themeId={currentTrip.themeId} />

        <GetSplitFloatingBtn />

        <MainContent>
          <EditTripBtn />

          {/* People Section */}
          <SectionTitle
            text={"People"}
            buttonText={"ADD +"}
            onClickAction={() => {
              addPersonUiHandler({ action: "OPEN" });
            }}
          />
          <PersonListView />

          {/* Activities Section */}
          <SectionTitle
            text={"Activities"}
            buttonText={"ADD +"}
            onClickAction={() => {
              addActivityUiHandler({ action: "OPEN" });
            }}
          />
          <ActivityListView />
        </MainContent>
      </PageWrapper>
    </ProtectedPage>
  );
};

export default Trip;
