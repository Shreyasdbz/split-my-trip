/** @format */

interface IButton {
  tid: string;
  text: string;
  onClickAction: () => void;
  outline: boolean;
}

const Button = ({ tid, text, outline, onClickAction }: IButton) => {
  return <button onClick={() => onClickAction()}>{text}</button>;
};

export default Button;
