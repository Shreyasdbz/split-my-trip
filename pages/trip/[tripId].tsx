/** @format */
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

import { FirebaseConfig } from "../../lib/firebase/config";
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
import Loading from "../loading";
import EditPersonModal from "../../components/trip/EditPersonModal";

const Trip = () => {
  const nextRouter = useRouter();
  const { tripId } = nextRouter.query;
  const [user, loading] = useAuthState(FirebaseConfig.auth);

  const allTrips = useContext(TripDataContext).trips;
  const currentTrip = useContext(TripDataContext).currentTrip;
  const changeCurrentTrip = useContext(TripDataContext).changeCurrentTrip;
  const saveSharedTrip = useContext(TripDataContext).saveSharedTrip;

  const addPersonUiHandler = useContext(UiContext).handleAddPerson;
  const addActivityUiHandler = useContext(UiContext).handleAddActivity;
  const editActivityUiHandler = useContext(UiContext).handleEditActivity;

  useEffect(() => {
    if (typeof tripId === "string") {
      changeCurrentTrip(tripId, true);
      if (!currentTrip) {
        changeCurrentTrip(tripId, false);
      }
    }
  }, [allTrips]);

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    nextRouter.push("/signin");
  }
  if (!currentTrip) {
    return <Loading />;
  }

  return (
    <ProtectedPage>
      {/* Modals */}
      <EditTripModal />
      <AddPersonModal />
      <EditPersonModal />
      <AddActivityModal />

      <PageWrapper>
        <Header text={currentTrip.title} themeId={currentTrip.themeId} />

        <GetSplitFloatingBtn />

        <MainContent>
          {/* Shared By banner */}
          {currentTrip.owned === false ? (
            <div className="w-full flex items-center justify-center mt-4">
              <div className="flex items-center justify-center flex-row font-light bg-gray-200 px-4 py-2 rounded-lg text-gray-600 text-sm">
                <span>shared with you by:</span>
                <span className="pl-1 font-normal">
                  {currentTrip.ownerName}
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}

          {/* Save Shared Trip Button */}
          {currentTrip.tripSaved === false ? (
            <div className="w-full flex items-center justify-center mt-2">
              <button
                className="bg-gray-500 px-4 py-2 rounded-full text-white text-sm shadow-md shadow-gray-500/50"
                onClick={() => {
                  if (typeof tripId === "string") {
                    saveSharedTrip(tripId);
                  }
                }}
              >
                Save Trip
              </button>
            </div>
          ) : (
            <></>
          )}

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
