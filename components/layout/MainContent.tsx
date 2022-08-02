/** @format */

interface IMainContent {
  children: React.ReactElement | React.ReactElement[];
}
const MainContent = ({ children }: IMainContent) => {
  return (
    <main className="w-full max-w-6xl h-full flex flex-col justify-start items-center px-4">
      {children}
    </main>
  );
};

export default MainContent;
