/** @format */

interface IModalTitle {
  text: string;
  children?: React.ReactElement | React.ReactElement[];
}
const ModalTitle = ({ text, children }: IModalTitle) => {
  if (children) {
    return (
      <div className="w-full h-auto flex items-center justify-center text-2xl text-black mb-4 text-center">
        {children}
      </div>
    );
  } else {
    return (
      <div className="w-full h-auto flex items-center justify-center">
        <span className="font-light text-2xl text-black mb-4 text-center">
          {text}
        </span>
      </div>
    );
  }
};

export default ModalTitle;
