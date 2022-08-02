/** @format */
import { createContext, useState } from "react";

interface IUiContext {
  pageBlur: boolean;
  currentModalActive: ActiveModalTypes;
  handleUserSettings: ({ action }: IBasicModalActions) => void;
  handleNewTrip: ({ payload }: INewTripModalActions) => void;
  dismissAllModals: () => void;
}
export const UiContext = createContext({} as IUiContext);

interface IUiContextProvider {
  children: React.ReactElement | React.ReactElement[];
}
const UiContextProvider = ({ children }: IUiContextProvider) => {
  const [pageBlur, setPageBlur] = useState<boolean>(false);
  const [currentModalActive, setCurrentModalActive] =
    useState<ActiveModalTypes>("NONE");

  /**
   *
   * @param param0
   */
  function handleUserSettings({ action }: IBasicModalActions) {
    if (action === "OPEN") {
      setCurrentModalActive("USER_SETTINGS");
      setPageBlur(true);
    } else if (action === "CLOSE") {
      setCurrentModalActive("NONE");
      setPageBlur(false);
    }
  }

  function handleNewTrip({ payload }: INewTripModalActions) {
    if (payload.action === "OPEN") {
      setCurrentModalActive("NEW_TRIP");
      setPageBlur(true);
    } else if (payload.action === "CLOSE") {
      setCurrentModalActive("NONE");
      setPageBlur(false);
    } else if (payload.action === "SAVE") {
    }
  }

  /**
   *
   */
  function dismissAllModals() {
    setCurrentModalActive("NONE");
    setPageBlur(false);
  }

  const providerValue = {
    pageBlur,
    currentModalActive,
    handleUserSettings,
    handleNewTrip,
    dismissAllModals,
  };

  return (
    <UiContext.Provider value={providerValue}>{children}</UiContext.Provider>
  );
};

export default UiContextProvider;
