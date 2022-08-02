/** @format */

interface IModalTitle {
  text: string;
}
const ModalTitle = ({ text }: IModalTitle) => {
  return (
    <div className="w-full h-auto flex items-center justify-center">
      <span className="font-light text-2xl text-black mb-4">{text}</span>
    </div>
  );
};

export default ModalTitle;
