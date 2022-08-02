/** @format */
import { useContext } from "react";

import { UiContext } from "../../context/UiContext";

interface IPageWrapper {
  children: React.ReactElement | React.ReactElement[];
}

const PageWrapper = ({ children }: IPageWrapper) => {
  const pageBlur = useContext(UiContext).pageBlur;
  return (
    <div
      className={`flex w-screen h-screen items-center justify-start flex-col relative overflow-hidden  ${
        pageBlur ? "blur-md" : "filter-none"
      }`}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
