/** @format */
import { createContext, useState } from "react";

interface IUiContext {
  pageBlur: boolean;
  userSettingsModalActive: boolean;
  changeUserSettingsModal: ({ action }: IBasicModalActions) => void;
  dismissAllModals: () => void;
}
export const UiContext = createContext({} as IUiContext);

interface IUiContextProvider {
  children: React.ReactElement | React.ReactElement[];
}
const UiContextProvider = ({ children }: IUiContextProvider) => {
  const [pageBlur, setPageBlur] = useState<boolean>(false);
  const [userSettingsModalActive, setUserSettingsModalActive] =
    useState<boolean>(false);

  /**
   *
   * @param param0
   */
  function changeUserSettingsModal({ action }: IBasicModalActions) {
    if (action === "OPEN") {
      setUserSettingsModalActive(true);
      setPageBlur(true);
    } else if (action === "CLOSE") {
      setUserSettingsModalActive(false);
      setPageBlur(false);
    }
  }

  /**
   *
   */
  function dismissAllModals() {
    setUserSettingsModalActive(false);
    setPageBlur(false);
  }

  const providerValue = {
    pageBlur,
    userSettingsModalActive,
    changeUserSettingsModal,
    dismissAllModals,
  };

  return (
    <UiContext.Provider value={providerValue}>{children}</UiContext.Provider>
  );
};

export default UiContextProvider;
