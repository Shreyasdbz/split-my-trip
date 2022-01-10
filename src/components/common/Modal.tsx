/** @format */

type ModalProps = {
  activeOn: boolean;
  children: React.ReactNode;
};

const Modal = ({ activeOn, children }: ModalProps) => {
  if (activeOn) {
    return <div className="modal">{children}</div>;
  } else {
    return <></>;
  }
};

export default Modal;
