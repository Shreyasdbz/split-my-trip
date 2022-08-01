/** @format */
import { createContext, useState } from 'react';

interface IUiContext {
  pageBlurred: boolean;
}
export const UiContext = createContext({} as IUiContext);

interface IUiContextProvider {
  children: React.ReactElement | React.ReactElement[];
}
const UiContextProvider = ({ children }: IUiContextProvider) => {
  const [pageBlurred, setPageBlurred] = useState<boolean>(false);

  const providerValue = {
    pageBlurred,
  };

  return (
    <UiContext.Provider value={providerValue}>{children}</UiContext.Provider>
  );
};

export default UiContextProvider;
