/** @format */
import { createContext, useState } from "react";

interface IUiContext {
  pageBlur: boolean;
  currentModalActive: ActiveModalTypes;
  handleUserSettings: ({ action }: IBasicModalActions) => void;
  handleNewTrip: ({ action }: IBasicModalActions) => void;
  handleEditTrip: ({ action }: IBasicModalActions) => void;
  handleAddPerson: ({ action }: IBasicModalActions) => void;
  handleEditPerson: ({ action }: IBasicModalActions) => void;
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
    } else if (action === "CLOSE") dismissAllModals();
  }

  /**
   *
   * @param param0
   */
  function handleNewTrip({ action }: IBasicModalActions) {
    if (action === "OPEN") {
      setCurrentModalActive("NEW_TRIP");
      setPageBlur(true);
    } else if (action === "CLOSE") dismissAllModals();
  }

  /**
   *
   * @param param0
   */
  function handleEditTrip({ action }: IBasicModalActions) {
    if (action === "OPEN") {
      setCurrentModalActive("EDIT_TRIP");
      setPageBlur(true);
    } else if (action === "CLOSE") dismissAllModals();
  }

  /**
   *
   * @param param0
   */
  function handleAddPerson({ action }: IBasicModalActions) {
    if (action === "OPEN") {
      setCurrentModalActive("ADD_PERSON");
      setPageBlur(true);
    } else if (action === "CLOSE") dismissAllModals();
  }

  /**
   *
   * @param param0
   */
  function handleEditPerson({ action }: IBasicModalActions) {
    if (action === "OPEN") {
      setCurrentModalActive("EDIT_PERSON");
      setPageBlur(true);
    } else if (action === "CLOSE") dismissAllModals();
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
    handleEditTrip,
    handleAddPerson,
    handleEditPerson,
    dismissAllModals,
  };

  return (
    <UiContext.Provider value={providerValue}>{children}</UiContext.Provider>
  );
};

export default UiContextProvider;
