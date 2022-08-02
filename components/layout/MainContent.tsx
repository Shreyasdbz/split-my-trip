/** @format */

interface IMainContent {
  children: React.ReactElement | React.ReactElement[];
}
const MainContent = ({ children }: IMainContent) => {
  return (
    <main className="hideScrollBars w-full max-w-6xl h-full flex flex-col justify-start items-center px-2 md:px-12 overflow-y-scroll">
      {children}
    </main>
  );
};

export default MainContent;
