/** @format */

interface ISubHeading {
  text: string;
}
const SubHeading = ({ text }: ISubHeading) => {
  return (
    <div className="w-full h-auto text-3xl mt-8 mb-2 text-gray-900">
      <span>{text}</span>
    </div>
  );
};

export default SubHeading;
