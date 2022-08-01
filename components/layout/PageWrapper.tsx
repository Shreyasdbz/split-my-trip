/** @format */
import { useContext } from "react";

import { UiContext } from "../../context/UiContext";

interface IPageWrapper {
  children: React.ReactElement | React.ReactElement[];
}

const PageWrapper = ({ children }: IPageWrapper) => {
  const pageBlurred = useContext(UiContext).pageBlurred;
  return (
    <div className="flex w-screen h-screen items-center justify-start flex-col relative">
      {children}
    </div>
  );
};

export default PageWrapper;
