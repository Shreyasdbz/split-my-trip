/** @format */

interface ISubHeading {
  text: string;
}
const SubHeading = ({ text }: ISubHeading) => {
  return (
    <div className="w-full h-auto text-2xl font-bold">
      <span>{text}</span>
    </div>
  );
};

export default SubHeading;
