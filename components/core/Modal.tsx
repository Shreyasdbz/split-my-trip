/** @format */

interface IModal {
  children: React.ReactElement | React.ReactElement[];
}
const Modal = ({ children }: IModal) => {
  return (
    <div className="w-screen h-screen flex items-start justify-center fixed z-30">
      <div className="bg-white px-8 py-14 my-36 rounded-md shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Modal;
