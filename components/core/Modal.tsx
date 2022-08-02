/** @format */

interface IModal {
  children: React.ReactElement | React.ReactElement[];
}
const Modal = ({ children }: IModal) => {
  return (
    <div className="w-screen h-screen flex items-start justify-center fixed z-30">
      <div className="bg-white px-8 py-14 mt-10 rounded-md shadow-lg min-w-modalSmall md:min-w-modalMedium lg:min-w-modalLarge">
        {children}
      </div>
    </div>
  );
};

export default Modal;
